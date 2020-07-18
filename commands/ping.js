module.exports = {
	name: 'time',
	description: 'Ping!',
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Pong is back.');
	},
	cronExecute(channel) {
		channel.send('Il est 15h02.');
	},
};