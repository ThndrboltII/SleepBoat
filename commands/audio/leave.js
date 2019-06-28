const commando = require('discord.js-commando');

class LeaveCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'audio',
            memberName: 'leave',
            description: 'Make SleepBoat leave your vocal channel',
            examples: [ '&leave' ]
        });
    }

    async run(message, args) {
        console.log('Leaving a voice channel...')
        if(message.guild.voiceConnection){
            message.guild.voiceConnection.disconnect();
            console.log('Successfully leaved.');
        }
        else{
            message.reply('I must be in a voice channel to leave it!');
            console.log('Not in a voice channel.');
        }
    }
}

module.exports = LeaveCommand;