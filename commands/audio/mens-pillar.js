const commando = require('discord.js-commando');

class MensPillarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pillar',
            group: 'audio',
            memberName: 'pillar',
            description: "Play the men's pillar anthem",
            examples: [ '&pillar' ]
        });
    }

    async run(message, args) {
        message.channel.sendMessage({files: ["Audio storage/mens pillar.mp3"]});
    }
}

module.exports = MensPillarCommand;