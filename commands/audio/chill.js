const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');
const voteemoji = [{vote:'1' , number:'594114270438883328' ,  nam:'onevote'},{vote:'2' , number:'594114368468287498', nam:'twovote'},{vote:'3' , number:'594114502753124363', nam:'threevote'},{vote:'4' , number:'594114532922884128', nam:'fourvote'},{vote:'5' , number:'594114571279794179', nam:'fivevote'}];
var array = [{name:'Train Sounds and Blizzard Howling [4H]', url:'https://youtu.be/TA4mhuFF-Go'},
{name:'Rain and Thunderstorm sound|Crackling fireplace [3H]', url:'https://youtu.be/3sL0omwElxw'},
{name:'Rain on Tent and Campfire Crackling Near the River [10H]', url:'https://youtu.be/egf-q8RibSc'},
{name:'Rain on a Car [10H]', url:'https://youtu.be/guo8CHurCpY'},
{name:'Airplane Cabin White Noise Jet Sounds [10H]', url:'https://youtu.be/co7KgV2edvI'}];
var position;
var next;

function Play(connection, message){
    var server = servers[message.guild.id];
    server.dipatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dipatcher.on('end', function(){
        if(server.queue[0]){
            Play(connection, message);
        }else{
            connection.disconnect();
        }
    })
}

class ChillCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'chill',
            group: 'audio',
            memberName: 'chill',
            description: "Tap `&chill` and choose one sound for chilling.If there are two links choosed with the same amount of vote, it'll the first in the row which will be played.",
            examples: [ '&chill' ]
        });
    }

    async run(message, args) {
        console.log('Running relaxing command...');
        let msg = await message.channel.send('__**Choose one of these link under 20 seconds:**__```1: ' + array[0].name + '\n2: ' + array[1].name + '\n3: ' + array[2].name + '\n4: ' + array[3].name + '\n5: ' + array[4].name + '```');
        for(var i=0; i<=voteemoji.length-1; i++){
            await msg.react(voteemoji[i].number).catch(error => console.log("Send Error - " + error));
        }
        const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === voteemoji[0].nam || reaction.emoji.name === voteemoji[1].nam || reaction.emoji.name === voteemoji[2].nam || reaction.emoji.name === voteemoji[3].nam || reaction.emoji.name === voteemoji[4].nam, {time: 20000});
        
        var counter = [];
        counter.length = voteemoji.length;
        for(var i=0; i<=voteemoji.length-1; i++){
            if(!reactions.get(voteemoji[i].number)){
                counter[i] = 0;
            }else{
                counter[i] = reactions.get(voteemoji[i].number).count-1;
            }
            
        }
        // var k = `Voting complete!\n`;
        // for(var i=0; i<=voteemoji.length-1; i++){
        //     k = k + `\n<:${voteemoji[i].nam}:${voteemoji[i].number}>: ${counter[i]}`;
        // }
        message.channel.send('Voting complete!');
        console.log('Done.');

        var max=0;
        for(var i=0; i<=counter.length-1; i++){
            if(counter[i]>max){
                max = counter[i];
                position = i;
            }
        }if(max==0){
            console.log('No link choosed');
            return;
        }else{
            next = array[position].url;
            console.log('position in the list: ' + position);
        }

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
                        server.queue.push(next);
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

module.exports = ChillCommand;