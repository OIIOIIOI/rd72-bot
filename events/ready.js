require('dotenv').config({ path: __dirname+"/.env" });
const GUILD_ID = process.env.GUILD_ID;
const ROLE_ADMIN = process.env.ROLE_ADMIN;

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		if (!client.application?.owner)
			client.application?.fetch();
		
		const adminPermission =  {
			id: ROLE_ADMIN,
			type: 'ROLE',
			permission: true,
		};
		let fullPermissions = [];
		
		const commands = await client.guilds.cache.get(GUILD_ID)?.commands.fetch();
		commands.forEach(slashCommand => {
			fullPermissions.push({
				id: slashCommand.id,
				permissions: [adminPermission],
			});
		});
		
		await client.guilds.cache.get(GUILD_ID)?.commands.permissions.set({ fullPermissions });
	},
};