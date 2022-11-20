const mongoose = require('mongoose');

const raidModel = new mongoose.Schema({
  id: { type: String, require: true },
  guildId: { type: String, require: true },
  channelId: { type: String, require: true },
  leader: {
    id: { type: String, require: true },
    nameTag: { type: String, require: true },
  },
  raidName: { type: String, require: true },
  time: { type: String, require: true },
  postTime: { type: String, require: true },
  description: { type: String, require: true },
  participants: [
    {
      discordID: { type: String, require: true },
      discordTag: { type: String, require: true },
      class: { type: String, require: true },
    },
  ],
});

module.exports = mongoose.model('Raid', raidModel);
