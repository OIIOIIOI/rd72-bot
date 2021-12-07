require('dotenv').config({ path: __dirname+"/.env" });
const TOKEN = process.env.TOKEN;

const fs = require('fs');
// const cron = require("node-cron");
// const dayjs = require('dayjs');
const {
	Client,
	Intents,
	Collection,
} = require('discord.js');

// Create client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Register commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Register events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once)
		client.once(event.name, (...args) => event.execute(...args));
	else
		client.on(event.name, (...args) => event.execute(...args));
}

// Login
client.login(TOKEN);









/*
<:ref:618544270021885952>
<:rcppivot:618537132650135572>
<:rcpjammer:618537132700467220>
<:rcpblocker:618537132687884308>
<:president:619226378566369291>
<:nso:618541672854454293>
<:mfpivot:618537132600066069>
<:mfjammer:618537132557860865>
<:mfblocker:618537132600066068>
<:fmpivot:618537132503597076>
<:fmjammer:618537132243550232>
<:fmblocker:618537132449071131>
<:chpivot:638363516025438208>
<:chjammer:638363456042565641>
<:chblocker:638363564297551872>
*/






// Register requests
/*client.requests = new Collection();
 const activeRequests = [
 // 'hello.js',
 // 'goodbye.js',
 ];
 for (const file of activeRequests) {
 const request = require(`./requests/${file}`);
 client.requests.set(request.name, request);
 }*/

// READY HANDLER -----------------------------------------------------------------------------
/*client.once('ready', () => {
 // Setup Trackkarma reminders
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
 
 // Setup Chou reminders
 const reminders_chou = require('./settings/reminders_chou')
 for (const r of reminders_chou.list)
 {
 let merged = { ...reminders_chou.common, ...r.embed }
 cron.schedule(r.time, () => {
 // Check for exceptions
 let isException = false
 for (const ex of r.except) {
 isException = isException || dayjs().isSame(ex, 'day')
 }
 // Send scheduled message
 if (!isException) {
 const channel = client.channels.cache.get(r.channel)
 if (channel && channel.type === 'text')
 {
 channel.send({ embed: merged })
 .then(async msg => { // Add an emoji for each option
 for (emoji of r.reactions)
 await msg.react(emoji)
 }).catch((error) => { /!*console.log(error)*!/ })
 }
 }
 })
 }
 
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
 });*/

// MESSAGE HANDLER -----------------------------------------------------------------------------
/*client.on('message', message => {
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
 });*/

/*
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
*/
