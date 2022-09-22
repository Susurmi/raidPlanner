const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

async function deployCommands(clientID, guildID, botToken) {
  const rest = new REST({ version: '10' }).setToken(botToken);
  const commands = [];
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }

  console.log('Aktualisieren aller (/) Befehle gestartet.');
  await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
    body: commands,
  });
}

module.exports = { deployCommands };
