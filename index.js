require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const cron = require("node-cron");

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const test_channel = process.env.TEST_CHANNEL;

console.log(test_channel);

//https://discord.com/api/oauth2/authorize?client_id=732194531939844117&scope=bot&permissions=60480&guild_id=603636944513007658&disable_guild_select=true

/*const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	// console.log(`Logged in as ${client.user.tag}!`);
	const channel = client.channels.cache.get(test_channel);
	channel.send(`Logged in as ${client.user.tag}!`);

	cron.schedule("0 10 * * *", () => {
		const command = client.commands.get('swapi');
		command.cronExecute(client);
	});
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName))
		return;

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text')
		return message.reply('Command not available here');

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments`;
		if (command.usage)
			reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		message.reply('Error executing command');
	}

});*/

/*client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'server') {
		message.channel.send(`Server name: ${message.guild.name}\nServer ID: ${message.guild.id}\nTotal members: ${message.guild.memberCount}`);
	}
	else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
	else if (command === 'kick') {
		if (!message.mentions.users.size)
			return message.reply('you need to tag a user in order to kick them!');

		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
		message.channel.send(avatarList);
	}
	else if (command === 'react') {
		const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'nso');
		console.log(emoji)
		message.react('😂');
		message.react('618537132700467220');
		message.react(emoji);
	}
	else if (command === 'poll') {
		const filter = (reaction, user) => {
			return reaction.emoji.name === '';
		};

		const collector = message.createReactionCollector(filter, { time: 15000 });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});

	}


});*/

// client.login(token);
