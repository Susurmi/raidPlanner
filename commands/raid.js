const { SlashCommandBuilder } = require('discord.js');
const { raidEmbedBuilder } = require('../embeds.js/raidEmbed');
const { getImage } = require('../functions');
const { raidNameConverter } = require('../functions/nameConverter');
const { raidButtonBuilder } = require('../components/raidButtons');
const moment = require('moment');
moment.locale('de');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('raid')
    .setDescription('Erstelle ein neues Raid Event.')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('Name des Raids')
        .setRequired(true)
        .addChoices(
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
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName('datum')
        .setDescription('Datum des Events. Format: TT/MM/JJJJ')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('uhrzeit')
        .setDescription('Start Uhrzeit des Events. Format: HH:MM')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('comment')
        .setDescription('Beschreibung der Tätigkeit.')
        .setRequired(true)
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
          }
        )
    ),
  async execute(interaction, client) {
    const raidName = raidNameConverter(interaction.options.get('name').value);
    const img = getImage(interaction.options.get('name').value);
    const time = moment(
      interaction.options.get('datum').value +
        ' ' +
        interaction.options.get('uhrzeit').value,
      'DD/MM/YYYY HH:MM'
    ).unix();
    const postTime = moment().unix();

    if (time < postTime) {
      interaction.reply({
        content: 'Inkorrektes Datum/Uhrzeit! ⏲',
        ephemeral: true,
      });
      return;
    }
    const raidObject = {
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
    };

    const raidEmbed = await raidEmbedBuilder(
      raidObject,
      interaction,
      raidObject.participants
    );
    interaction.reply({ content: 'Event erstellt.', ephemeral: true });

    const raidButtons = raidButtonBuilder;

    const message = await interaction.channel.send({
      embeds: [raidEmbed],
      components: [raidButtons],
      fetchReply: true,
    });

    raidObject.id = message.id;
    client.raid.push(raidObject);
  },
};
