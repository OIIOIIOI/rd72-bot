const axios = require('axios');
const endpoint = "https://swapi.dev/api";

const test_channel = process.env.TEST_CHANNEL;

module.exports = {
	name: 'swapi',
	description: 'Star Wars API',
	guildOnly: true,
	args: true,
	cronExecute (client) {
		const channel = client.channels.cache.get(test_channel);
		this.realExecute(channel, ['starships', '9']);
	},
	execute (message, args) {
		this.realExecute(message.channel, args);
	},
	realExecute (channel, args) {
		channel.send(`Calling ${endpoint}/${args[0]}/${args[1]}...`);
		axios.get(`${endpoint}/${args[0]}/${args[1]}`)
			.then(function ({ data }) {
				channel.bulkDelete(1)
					.then(() => {
						if (args[0] === 'starships')
							channel.send(`The ${data.name} has a crew of ${data.crew} people.`)
						else if (args[0] === 'people')
							channel.send(`${data.name} has ${data.eye_color} eyes.`)
						else
							channel.send(`${data.url}`)
					})
			})
			.catch(function (error) {
				channel.send('Error');
			});
	},
};
