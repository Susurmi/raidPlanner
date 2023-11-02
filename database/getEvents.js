const raidModel = require('./models/raidModel');

const getRaids = async (client) => {
	const allEvents = await raidModel.find();
	client.raid = allEvents;
	client.on('ready', () => {
		allEvents.forEach(async (element) => {
			try {
				const eventChannel = await client.channels.cache.get(element.channelId);
				await eventChannel.messages.fetch(element.id);
			} catch (error) {
				raidModel.deleteOne({ id: element.id });
			}
		});
	});
	console.log('Geladene Events:' + allEvents.length);
};

module.exports = { getRaids };
