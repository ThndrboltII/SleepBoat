const commando = require('discord.js-commando');

class PingPongCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'text',
            memberName: 'ping',
            description: 'Reply pong to the commander',
            examples: [ '&ping']
        });
    }

    async run(message, args) {
        console.log('Running PingPongCommand...')
        message.reply("PONG MUDAFUKA!")
        console.log('Done.')
    }
}

module.exports = PingPongCommand;