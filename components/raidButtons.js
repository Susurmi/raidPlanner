const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const raidButtonBuilder = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('titan')
      .setLabel('Titan')
      .setStyle(ButtonStyle.Success)
      .setEmoji(process.env.TITAN_EMOJI)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('warlock')
      .setLabel('Warlock')
      .setStyle(ButtonStyle.Success)
      .setEmoji(process.env.WARLOCK_EMOJI)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('hunter')
      .setLabel('Jäger')
      .setStyle(ButtonStyle.Success)
      .setEmoji(process.env.HUNTER_EMOJI)
  )
  // .addComponents(
  //   new ButtonBuilder()
  //     .setCustomId('bench')
  //     .setLabel('Ersatz')
  //     .setStyle(ButtonStyle.Secondary)
  // )
  .addComponents(
    new ButtonBuilder()
      .setCustomId('quit')
      .setLabel('✖')
      .setStyle(ButtonStyle.Danger)
  )
  .toJSON();

module.exports = { raidButtonBuilder };
