const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Delete previous messages in the current channel')
		.addIntegerOption(option => option
			.setName('count')
			.setDescription('How many messages to delete'))
		.setDefaultPermission(false),
	async execute(interaction)
	{
		const count = interaction.options.getInteger('count') || 1;
		
		await interaction.channel.bulkDelete(count, true);
		
		await interaction.reply({
			content: `Successfully deleted ${count} message${count > 1 ? 's' : ''}`,
			ephemeral: true,
		});
	},
};
