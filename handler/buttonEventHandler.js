const { Client, BaseInteraction } = require('discord.js');
const { joinRaid } = require('../functions/joinRaid');

/**
 *
 * @param {BaseInteraction} interaction
 * @param {Client} client
 */
async function handleClick(interaction, client) {
	joinRaid(interaction, client);
}

module.exports = { handleClick };
