const commando = require('discord.js-commando');
//const TOKEN = require('./config.json');

const bot =  new commando.Client({
    owner: '326004207473655819',
    unknownCommandResponse: false,
    commandPrefix: '&'
});

const DBL = require('dblapi.js');
const dbl = new DBL(process.env.BOT_TOKEN, bot);

bot.registry.registerGroup("audio", "Audio");
bot.registry.registerGroup("text", "Text");

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

global.servers = {};

bot.on('disconnect', () => {
    console.log('Disconnected')
    signedIntoDiscord = false;
    bot.login(process.env.BOT_TOKEN).then(function(){
        console.log('Reconnected')
        signedIntoDiscord = true;
    });  
})

bot.on('reconnecting', () => {
    console.log('Reconnecting')
})

bot.on('ready', () => {
    console.log('Ready')
})

bot.on('resume', () => {
    console.log('Resume')
})

bot.login(process.env.BOT_TOKEN);