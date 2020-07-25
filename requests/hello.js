module.exports = {
	name: 'hello',
	keywords: ['hey', 'hello', 'hi', 'bonjour', 'bonsoir', 'salut'],
	execute (message) {
		message.reply('👋 Salut !');
	},
};