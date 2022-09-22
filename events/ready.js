const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`${client.user.tag} hat sich eingeloggt!`);

    client.user.setPresence({
      activities: [{ name: `Destiny 2`, type: ActivityType.Playing }],
      status: 'online',
    });
  },
};
