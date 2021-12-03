require('dotenv').config({ path: __dirname+"/.env" });
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
	try {
		console.log('Started refreshing commands.');
		
		// Guild-only register (for development)
		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
		// Global register
		// await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });
		
		console.log('Successfully reloaded commands.');
	} catch (error) {
		console.error(error);
	}
})();
