module.exports = {
	ping : function(){
		console.log('Pong')
		bot.sendMessage({
			to: channelID,
			message: 'Pong!'
		});
	}
}
