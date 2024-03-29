const { SlashCommandBuilder } = require('discord.js');
const { raidEmbedBuilder } = require('../embeds/raidEmbed');
const { getImage } = require('../functions');
const { raidNameConverter } = require('../functions/nameConverter');
const { raidButtonBuilder } = require('../components/raidButtons');
const { convertToUnix } = require('../functions/timeUtil');
const moment = require('moment');
const raidModel = require('../database/models/raidModel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raid')
		.setDescription('Erstelle ein neues Raid Event.')
		.addStringOption((option) =>
			option.setName('name').setDescription('Name des Raids').setRequired(true).addChoices(
				{
					name: 'Gläserne Kammer',
					value: 'vog',
				},
				{
					name: 'Letzter Wunsch',
					value: 'lw',
				},
				{
					name: 'Königsfall',
					value: 'kf',
				},
				{
					name: 'Tiefsteinkrypta',
					value: 'crypt',
				},
			),
		)
		.addStringOption((option) =>
			option
				.setName('datum')
				.setDescription('Datum des Events. Format: TT/MM/JJJJ')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('uhrzeit')
				.setDescription('Start Uhrzeit des Events. Format: HH:MM')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('comment').setDescription('Beschreibung der Tätigkeit.').setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('class')
				.setDescription('Welche Klasse spielst du im Event.')
				.setRequired(true)
				.setChoices(
					{
						name: 'Warlock',
						value: 'warlock',
					},
					{
						name: 'Titan',
						value: 'titan',
					},
					{
						name: 'Jäger',
						value: 'hunter',
					},
				),
		),
	isDeferred: true,
	async execute(interaction, client) {
		interaction.deferReply({ ephemeral: true });
		const raidButtons = raidButtonBuilder;
		const raidName = raidNameConverter(interaction.options.get('name').value);
		const img = getImage(interaction.options.get('name').value);
		const dateField = interaction.options.get('datum').value;
		const timeField = interaction.options.get('uhrzeit').value;
		const postTime = await moment().unix();
		const time = convertToUnix(dateField, timeField);

		if (time < postTime) {
			return interaction.reply({
				content: 'Inkorrektes Datum/Uhrzeit! ⏲',
				ephemeral: true,
			});
		}

		const newRaid = await raidModel.create({
			id: '',
			leader: {
				id: interaction.user.id,
				nameTag: interaction.user.tag,
			},
			raidName: raidName,
			img: img,
			time: time,
			postTime: postTime,
			description: interaction.options.get('comment').value,
			participants: [
				{
					discordID: interaction.user.id,
					discordTag: interaction.user.tag,
					class: interaction.options.get('class').value,
				},
			],
		});

		const raidEmbed = await raidEmbedBuilder(newRaid, interaction, newRaid.participants);
		interaction.editReply({ content: 'Event erstellt.', ephemeral: true });

		const message = await interaction.channel.send({
			embeds: [raidEmbed],
			components: [raidButtons],
			fetchReply: true,
		});

		newRaid.id = message.id;
		client.raid.push(newRaid);
		await newRaid.save();
		return;
	},
};
