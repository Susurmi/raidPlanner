const { joinRaid } = require('../functions/joinRaid');

async function handleClick(interaction, client) {
  joinRaid(interaction, client);
}

module.exports = { handleClick };
