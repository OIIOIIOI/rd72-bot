const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const moment = require("moment");

const TEAMS = require(`../data/teams.js`);
const TRAININGS = require(`../data/trainings.js`);
const LOCATIONS = require(`../data/locations.js`);

moment.locale('fr');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('training')
		.setDescription('Date et lieu du prochain training'),
	async execute(interaction)
	{
		let teamsButtons = [];
		TEAMS.data.forEach(team => {
			teamsButtons.push(new MessageButton()
				.setCustomId(team.id)
				.setLabel(team.name)
				.setEmoji(team.emoji)
				.setStyle('SECONDARY'));
		});
		
		const teamsRow = new MessageActionRow()
			.addComponents(teamsButtons);
		
		await interaction.reply({
			content: `Choisis une équipe :`,
			components: [teamsRow],
			ephemeral: true,
		});
		
		let actionsButtons = [
			new MessageButton()
				.setLabel('Trackkarma')
				.setURL('https://app.trackkarma.com')
				.setStyle('LINK')
		];
		
		const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
		
		collector.on('collect', async i => {
			// Get target team data
			const team = TEAMS.data.filter(team => team.id === i.customId).shift();
			
			// Keep only the target team's future trainings
			const today = moment();
			const results = TRAININGS.data.filter(training => training.teams.some(team => team === i.customId) && moment(training.date).diff(today) > 0);
			// Stop here if there's nothing left
			if (results.length === 0)
			{
				const actionsRow = new MessageActionRow()
					.addComponents(actionsButtons);
				
				// Stop collector
				collector.stop();
				
				await i.update({
					content: `Aucun training ${team.name} n'a été trouvé pour le moment...`,
					embeds: [],
					components: [actionsRow],
					ephemeral: true,
				});
			}
			else
			{
				// Sort trainings by date just in case
				const sortedResults = results.sort((trainingA, trainingB) => moment(trainingA.date).diff(moment(trainingB.date)));
				// Keep only the next one
				const training = sortedResults.shift();
				
				// Get location data
				const location = LOCATIONS.data.filter(location => location.id === training.location).shift();
				
				// Setup message content
				const embed = new MessageEmbed()
					.setColor(team.color)
					.setTitle(`${team.emoji} Prochain training ${team.name} : ${team.emoji}`)
					.addFields(
						{ name: 'Date :', value: moment(training.date).format('dddd DD MMMM'), inline: true },
						{ name: 'Heure :', value: moment(training.date).format('HH[h]mm'), inline: true },
						{ name: 'Lieu :', value: location.name },
					);
				// Add special note if exists
				if (training.note)
					embed.setDescription(training.note);
				
				// Add Maps button
				actionsButtons.push(new MessageButton()
					.setLabel('Google Maps')
					.setURL(location.map_url)
					.setStyle('LINK'));
				const actionsRow = new MessageActionRow()
					.addComponents(actionsButtons);
				
				// Stop collector
				collector.stop();
				
				// Update reply
				await i.update({
					content: ' ',
					embeds: [embed],
					components: [actionsRow],
					ephemeral: true,
				});
			}
		});
		
	},
};
