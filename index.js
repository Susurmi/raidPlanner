require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { deployCommands, loadCommands, loadEvents } = require('./handler/index.js');
const { getRaids } = require('./database/getEvents.js');
const { connectDatabase } = require('./database/index.js');

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const DB_URI = process.env.DB_URI;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildIntegrations,
	],
});

client.commands = new Collection();
client.raid = [];

/**
 *
 */
async function main() {
	try {
		await connectDatabase(DB_URI);
		loadEvents(client);
		loadCommands(client);
		deployCommands(CLIENT_ID, GUILD_ID, TOKEN)
			.then(async () => {
				client.login(TOKEN);
				await getRaids(client);
			})
			.catch((e) => console.error(e));
	} catch (err) {
		console.error(err);
	}
}

main();
