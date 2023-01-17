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
      command.execute(interaction, client);
    } catch (error) {
      console.error(e);
      if (command.isDeferred) {
        return interaction.editReply({
          content: 'Es ist ein Fehler aufgetreten! 🛑',
          ephemeral: true,
        });
      }
      interaction.reply({
        content: 'Es ist ein Fehler aufgetreten! 🛑',
        ephemeral: true,
      });
    }
  },
};
