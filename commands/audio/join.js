const commando = require('discord.js-commando');

class JoinCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'audio',
            memberName: 'join',
            description: 'Make SleepBoat join your vocal channel',
            examples: [ '&join' ]
        });
    }

    async run(message, args) {
        console.log('Joining a voice channel...')
        if(message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                message.member.voiceChannel.join()
                    .then(connection =>{
                        message.reply('SleepBoat has joined ***' + connection.channel.name + '***!');
                        console.log('Successfully joined.');
                    })
            }
        }
        else{
            message.reply('You must be in a voice channel to summon me!');
            console.log('Commander is not in a voice channel.');
        }
    }
}

module.exports = JoinCommand;