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
	'prune.js',
	'list-channels.js',
];
for (const file of activeCommands) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Register requests
client.requests = new Discord.Collection();
const activeRequests = [
	'hello.js',
	'goodbye.js',
];
for (const file of activeRequests) {
	const request = require(`./requests/${file}`);
	client.requests.set(request.name, request);
}

// READY HANDLER -----------------------------------------------------------------------------
client.once('ready', () => {
	// Setup Trackkarma reminders
	/*const reminders_tk = require('./settings/reminders_tk');
	for (const r of reminders_tk.list)
	{
		let merged = { ...reminders_tk.common, ...r.embed };
		cron.schedule(r.time, () => {
			const channel = client.channels.cache.get(r.channel);
			if (channel && channel.type === 'text')
				channel.send({ embed: merged });
		});
	}*/

	// Setup regular reminders
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
});

// MESSAGE HANDLER -----------------------------------------------------------------------------
client.on('message', message => {
	// Don't listen to the bots
	if (message.author.bot)
		return;

	// Check for commands
	if (client.commands.size > 0 && message.content.startsWith(PREFIX))
		checkForCommand(message);

	// Check for requests
	const firstMention = message.mentions.users.first();
	if (client.requests.size > 0 && firstMention && firstMention.id === client.user.id)
		checkForRequest(message);
});

function checkForCommand (message)
{
	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName))
		return;

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text')
		return message.reply("Cette commande n'est pas disponible ici");

	if (command.adminOnly && !message.member.hasPermission('ADMINISTRATOR'))
		return message.reply("Cette commande est réservée aux admins");

	if (command.args && !args.length) {
		let reply = `Cette commande requiert un ou plusieurs arguments :`;
		if (command.usage)
			reply += `\n\nUsage : \`${PREFIX}${command.name} ${command.usage}\``;
		if (command.description)
			reply += `\n*${command.description}*`;
		return message.channel.send(reply);
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		message.reply('Error executing command');
	}
}

function checkForRequest (message)
{
	let firstRequest;
	let firstRequestPos = 9999;
	client.requests.each(request => {
		for (k of request.keywords) {
			let res = message.content.toLocaleLowerCase().search(k);
			if (res > -1 && res < firstRequestPos) {
				firstRequest = request;
				firstRequestPos = res;
				break;
			}
		}
	});

	if (firstRequest) {
		try {
			firstRequest.execute(message);
		} catch (error) {
			message.reply('Error executing command');
		}
	}
}

// Login
client.login(TOKEN);
