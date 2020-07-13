module.exports = {
	name: 'prune',
	guildOnly: true,
	execute(message, args) {
		const amount = parseInt(args[0]);
		if (isNaN(amount))
			return message.reply('That doesn\'t seem to be a valid number.');
		message.channel.bulkDelete(amount);
	},
};