module.exports = {
	name: 'list-channels',
	guildOnly: true,
	adminOnly: true,
	description: 'List all server channels',
	execute (message, args, client) {
		let list = [];
		let chans = client.channels.cache;
		chans.each(c => {
			list.push(`${c.id}: <#${c.id}>`);
			if (list.length === 20)
			{
				message.channel.send('----\n'+list.join('\n'));
				list = [];
			}
		});
		if (list.length > 0)
			message.channel.send('----\n'+list.join('\n'));
	},
};