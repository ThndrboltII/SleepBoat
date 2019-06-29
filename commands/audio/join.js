const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

function Play(connection, message){
    var server = servers[message.guild.id];
    server.dipatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dipatcher.on('end', function(){
        if(server.queue[0]){
            console.log('Playing:' + server.queue[0]);
            Play(connection, message);
        }else{
            connection.disconnect();
        }
    })
}

class JoinCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'audio',
            memberName: 'join',
            description: 'Make SleepBoat join your vocal channel',
            examples: [ '&join' , '&join url' ]
        });
    }

    async run(message, args) {
        console.log('Joining a voice channel...')
        if(message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                if(!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                }
                message.member.voiceChannel.join()
                    .then(connection =>{
                        var server = servers[message.guild.id];
                        message.reply('SleepBoat has joined ***' + connection.channel.name + '***!');
                        console.log('Successfully joined.');
                        server.queue.push(args);
                        Play(connection, message);
                    })
            }
            else{
                console.log('Already in a voice channel.')
            }
        }
        else{
            message.reply('You must be in a voice channel to summon me! Please retry or leave.');
            console.log('Commander is not in a voice channel.');
        }
    }
}

module.exports = JoinCommand;