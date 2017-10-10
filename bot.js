var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

const fs = require('fs');
const comdir = './commands/';
var commands = [];
var counter = 0;

fs.readdirSync(comdir).forEach(file => {
  console.log(file);
  commands[counter] = file;
  counter = counter + 1;
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		var found = 0;
		newcounter = counter;
        args = args.splice(1);
		while (newcounter >= 0) {
			newcounter--;
			if (cmd + '.js' == commands[newcounter]){
				var path = (comdir + cmd)
				var call = require(path)
				console.log(path)
				call[cmd](args)
				var found = 1
			}
		}
		console.log(found)
		if (found == 0){
				console.log('Found was zero')
				bot.sendMessage({
					to: channelID,
					message: 'I don\'t know what you\'re talking about. Puhuhuhu~'
				});
		}
		
     }
});