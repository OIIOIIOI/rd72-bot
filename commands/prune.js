module.exports = {
	name: 'prune',
	guildOnly: true,
	adminOnly: true,
	description: 'Supprime <n> messages dans le salon',
	usage: '<n>',
	args: true,
	execute(message, args) {
		const amount = parseInt(args[0]);
		if (isNaN(amount))
			return message.reply("Un entier est requis");
		message.channel.bulkDelete(amount, true);
	},
};