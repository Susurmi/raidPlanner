const fs = require('node:fs');
const path = require('node:path');
const AsciiTable = require('ascii-table');
const { Client } = require('discord.js');

/**
 *
 * @param {Client} client
 */
async function loadCommands(client) {
	const table = new AsciiTable('Commands').setHeading('', 'Commands', 'Status');
	let index = 1;
	const commandsPath = path.join(__dirname, '../commands');
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

	for (const file of commandFiles) {
		try {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			client.commands.set(command.data.name, command);
			table.addRow(index, command.data.name, '✔');
			index += 1;
		} catch (error) {
			table.addRow(index, file, '❌');
			index += 1;
		}
	}

	console.log(table.toString());
}

module.exports = { loadCommands };
