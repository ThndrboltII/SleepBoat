const commando = require('discord.js-commando');

class AyayaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ayaya',
            group: 'audio',
            memberName: 'ayaya',
            description: 'Play anime ayaya (I seriously need help)',
            examples: [ '&ayaya' ]
        });
    }

    async run(message, args) {
        message.channel.sendMessage({files: ["Audio storage/ayaya.mp3"]});
    }
}

module.exports = AyayaCommand;