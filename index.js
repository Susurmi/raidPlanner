require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const {
  deployCommands,
  loadCommands,
  loadEvents,
} = require('./handler/index.js');

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();
client.raid = [];

async function main() {
  try {
    loadEvents(client);
    loadCommands(client);
    deployCommands(CLIENT_ID, GUILD_ID, TOKEN);
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
