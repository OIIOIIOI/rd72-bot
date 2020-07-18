require('dotenv').config({
	path: __dirname+"/.env"
});

const Discord = require('discord.js');
const cron = require("node-cron");

const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;
const TEST_CHANNEL = process.env.TEST_CHANNEL;

// INIT -----------------------------------------------------------------------------

// Create Discord client
const client = new Discord.Client();

// Register commands
client.commands = new Discord.Collection();
const activeCommands = [
	// 'ping.js',
];
for (const file of activeCommands)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// READY HANDLER -----------------------------------------------------------------------------
client.once('ready', () => {
	// const channel = client.channels.cache.get(TEST_CHANNEL);
	// channel.send(`Je suis là ! ${client.user.tag}!`);
	// channel.send(`Je suis de retour !`);

	let chans = client.channels.cache;
	chans.each(c => {
		console.log(c.name, c.id)
	})
	// let chan = chans.get('690282970761658459');
	// console.log(chan);

	// Trackkarma reminders
	const reminders_tk = require('./settings/reminders_tk');
	for (const r of reminders_tk.list)
	{
		let merged = { ...reminders_tk.common, ...r.embed };
		cron.schedule(r.time, () => {
			const channel = client.channels.cache.get(r.channel);
			if (channel && channel.type === 'text')
				channel.send({ embed: merged });
		});
	}

	// Regular reminders
	const reminders = require('./settings/reminders');
	for (const r of reminders)
	{
		cron.schedule(r.time, () => {
			const channel = client.channels.cache.get(r.channel);
			if (channel && channel.type === 'text')
			{
				if (r.type === 'embed')
					channel.send({ embed: r.message });
				else
					channel.send(r.message);
			}
		});
	}

	// client.destroy();
});

// MESSAGE HANDLER -----------------------------------------------------------------------------
client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot)
		return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName))
		return;

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text')
		return message.reply('Command not available here');

	if (command.args && !args.length) {
		let reply = `Cette commande requiert un ou plusieurs arguments :`;
		if (command.usage)
			reply += `\nUsage : \`${PREFIX}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		message.reply('Error executing command');
	}
});

// Login
client.login(TOKEN);
