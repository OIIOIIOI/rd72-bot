module.exports = {
	name: 'prune',
	guildOnly: true,
	adminOnly: true,
	description: 'Supprime <n> messages dans le salon',
	usage: '<n>',
	args: true,
	execute(message, args) {
		let amount = parseInt(args[0]);
		if (isNaN(amount))
			return message.reply("Un entier est requis");

		while (amount > 0)
		{
			message.channel.lastMessage.delete();
			amount--;
		}
		// message.channel.bulkDelete(amount, true);
	},
};