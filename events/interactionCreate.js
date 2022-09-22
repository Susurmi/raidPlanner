const { handleClick } = require('../handler/index.js');

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    if (interaction.isButton()) handleClick(interaction, client);
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Es ist ein Fehler aufgetreten! 🛑',
        ephemeral: true,
      });
    }
  },
};
