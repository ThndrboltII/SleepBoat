const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'text',
            memberName: 'roll',
            description: 'Rolls a/several die/dice',
            examples: [ '&roll' , '&roll 3']
        });
    }

    async run(message, args) {
        console.log('Running DiceRollCommand...')
        var roll = 0;
        args = Math.round(args);
        if(args == 0){args = 1;}
        for(var i=1; i<=args; i++){
            roll = Math.floor(Math.random() * 6) + 1 + roll;
        }
        if(args == 1){var dice = 'die'}else{var dice = 'dice'}
        message.reply('You rolled ' + args + ' ' + dice + ' for a ' + roll);
        message.channel.sendMessage('min: 0 , ' + 'max: ' + args*6);
        console.log('Done.')
    }
}

module.exports = DiceRollCommand;