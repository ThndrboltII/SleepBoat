const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');
var array = [{name:'Train Sounds and Blizzard Howling', url:'https://www.youtube.com/watch?v=TA4mhuFF-Go&t=1708s'}, 
{name:'Rain and Thunderstorm sound|Crackling fireplace', url:'https://www.youtube.com/watch?v=3sL0omwElxw'}]

class ChillCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'chill',
            group: 'audio',
            memberName: 'chill',
            description: 'Tap `&chill` and choose one sound for chilling',
            examples: [ '&chill' ]
        });
    }

    async run(message, args) {
        message.channel.sendMessage('```1: ' + array[0].name + '\n2: ', + array[1].name + '```');
    }
}

module.exports = ChillCommand;