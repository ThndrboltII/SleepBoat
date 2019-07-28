const commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const bot = new commando.Client({
  owner: "326004207473655819",
  unknownCommandResponse: false,
  commandPrefix: "&"
});
require("dotenv").config();
const token = process.env.NODE_ENV;
//const config = require("./config.json");
//const SQLite = require("better-sqlite3");
//const sql = new SQLite("./scores.sqlite");

/*const DBL = require('dblapi.js');
const dbl = new DBL(process.env.BOT_TOKEN, bot);*/

bot.registry.registerGroup("audio", "Audio");
bot.registry.registerGroup("text", "Text");

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

global.servers = {};

bot.login(token);

/*bot.on("ready", () => {
    // Check if the table "points" exists.
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
      // Ensure that the "id" row is always unique and indexed.
      sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
      sql.pragma("synchronous = 1");
      sql.pragma("journal_mode = wal");
    }
  
    // And then we have two prepared statements to get and set the score data.
    bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    bot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

bot.on("message", message => {
    if (message.author.bot) return;
    let score;
    if (message.guild) {
        score = bot.getScore.get(message.author.id, message.guild.id);
        console.log(score);
        if (!score) {
            score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, username: message.member.user.tag, points: 0, level: 1 }
        }
        console.log(message.author.length)
        score.points++;
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
        if(score.level < curLevel) {
            score.level++;
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that crazy?`);
        }
        bot.setScore.run(score);
    }
    if (message.content.indexOf(bot.commandPrefix) !== 0) return;
  
    const args = message.content.slice(bot.commandPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // Command-specific code here!
    if(command === "points") {
        return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
    }

    if(command === "give") {
        // Limited to guild owner - adjust to your own preference!
        if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
      
        const user = message.mentions.users.first() || bot.users.get(args[0]);
        if(!user) return message.reply("You must mention someone or give their ID!");
      
        const pointsToAdd = parseInt(args[1], 10);
        if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
      
        // Get their current points.
        let userscore = bot.getScore.get(user.id, message.guild.id);
        // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
        if (!userscore) {
          userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
        }
        userscore.points += pointsToAdd;
      
        // We also want to update their level (but we won't notify them if it changes)
        let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
        userscore.level = userLevel;
      
        // And we save it!
        bot.setScore.run(userscore);
      
        return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
    }
      
    if(command === "leaderboard") {
        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
      
          // Now shake it and show it! (as a nice embed, too!)
        const embed = new RichEmbed()
          .setTitle("Leaderboard")
          .setAuthor(bot.user.username, bot.user.avatarURL)
          .setDescription("Our top 10 points leaders!")
          .setColor(0x00AE86);
      
        for(const data of top10) {
          embed.addField(bot.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
        }
        return message.channel.send({embed});
    }
});*/

bot.on("disconnect", () => {
  console.log("Disconnected");
  signedIntoDiscord = false;
  bot.login(token).then(function() {
    console.log("Reconnected");
    signedIntoDiscord = true;
  });
});

bot.on("reconnecting", () => {
  console.log("Reconnecting");
});

bot.on("ready", () => {
  //TODO production environment : `npm run production` --> process.env.NODE_ENV === `production`
  //TODO development environment : `npm run development` --> process.env.NODE_ENV === `development`
  if (token === "production") {
    bot.user.setActivity("chill sounds", { type: "PLAYING" });
  } else {
    bot.user.setActivity("in code land", { type: "PLAYING" });
  }
  console.log("Ready");
});

bot.on("resume", () => {
  console.log("Resume");
});

bot.login(token);
