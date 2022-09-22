const { EmbedBuilder } = require('discord.js');
const { getPlayers } = require('../functions/getPlayers');

async function raidEmbedBuilder(raidObject, interaction, participants) {
  const { raidName, time, img } = raidObject;

  const players = getPlayers(participants);
  const { titan, warlock, hunter, counter } = players;

  const warlockIcon = interaction.guild.emojis.cache.get(
    process.env.WARLOCK_EMOJI
  );
  const titanIcon = interaction.guild.emojis.cache.get(process.env.TITAN_EMOJI);
  const hunterIcon = interaction.guild.emojis.cache.get(
    process.env.HUNTER_EMOJI
  );

  const raidEmbed = new EmbedBuilder()
    .setColor('White')
    .setTitle(`${raidName}`)
    .setDescription(
      `Leiter: ${interaction.user.tag} - ID: ${interaction.user.id}`
    )
    .addFields({
      name: '\u200b',
      value: `**${raidObject.description}**\n \u200b`,
    })
    .addFields(
      {
        name: `📅 <t:${time}:d>`,
        value: '\u200b',
        inline: true,
      },
      {
        name: `⏱ <t:${time}:t>`,
        value: '\u200b',
        inline: true,
      },
      {
        name: `👥 ${counter}/6`,
        value: '\u200b',
        inline: true,
      }
    )
    .addFields(
      {
        name: `${titanIcon} *Titan*`,
        value: `${titan}`,
        inline: true,
      },
      { name: `${warlockIcon} *Warlock*`, value: `${warlock}`, inline: true },
      { name: `${hunterIcon} *Jäger*`, value: `${hunter}`, inline: true }
    )
    .addFields({
      name: '\u200b',
      value: '\u200b',
    })
    .setImage(img)
    .toJSON();

  return raidEmbed;
}

module.exports = { raidEmbedBuilder };
