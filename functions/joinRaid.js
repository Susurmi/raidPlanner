const { raidEmbedBuilder } = require('../embeds.js/raidEmbed');

async function joinRaid(interaction, client) {
  const { customId, user, message } = interaction;

  const raidObject = await client.raid.find((x) => x.id === message.id);
  if (raidObject === undefined) {
    interaction.reply({
      content: 'Dieses Event existiert nicht mehr!',
      ephemeral: true,
    });
    return;
  }

  const participant = raidObject.participants.find(
    (x) => x.discordID === user.id
  );

  if (customId === 'quit') {
    if (user.id === raidObject.leader.id) {
      interaction.reply({
        content: 'Möchtest du dein Event löschen?',
        ephemeral: true,
      });
      return;
    }

    if (!participant || participant === undefined) {
      interaction.reply({
        content: 'Du bist nicht teil dieses Raidtrupps!',
        ephemeral: true,
      });
      return;
    }

    let index = raidObject.participants
      .map((x) => {
        return x.discordID;
      })
      .indexOf(user.id);
    if (!raidObject.participants[index].discordID === user.id) return;
    raidObject.participants.splice(index, 1);

    const deletedPlayer = await raidEmbedBuilder(
      raidObject,
      interaction,
      raidObject.participants
    );

    message.edit({ embeds: [deletedPlayer] });

    interaction.reply({
      content: 'Du hast dich vom Raid abgemeldet!',
      ephemeral: true,
    });

    return;
  }

  if (participant && participant != undefined) {
    if (participant.class === customId) {
      interaction.reply({
        content: 'Du bist bereits mit dieser Klasse angemeldet!',
        ephemeral: true,
      });
      return;
    }
    if (participant.class != customId) {
      participant.class = customId;

      interaction.reply({
        content: 'Du hast deine Klasse geändert!',
        ephemeral: true,
      });

      const classChange = await raidEmbedBuilder(
        raidObject,
        interaction,
        raidObject.participants
      );

      message.edit({ embeds: [classChange] });
      return;
    }
  }

  if (participant === undefined) {
    if (raidObject.participants.length > 5) {
      interaction.reply({
        content: 'Dieser Raid ist leider voll!',
        ephemeral: true,
      });
      return;
    }
    const newParticipant = {
      discordID: user.id,
      discordTag: user.tag,
      class: customId,
    };

    raidObject.participants.push(newParticipant);

    interaction.reply({
      content: 'Du hast dich erfolgreich für den Raid eingetragen!',
      ephemeral: true,
    });

    const addPlayer = await raidEmbedBuilder(
      raidObject,
      interaction,
      raidObject.participants
    );

    message.edit({ embeds: [addPlayer] });
  } else {
    interaction.reply({
      content: 'Es gab einen Fehler! 🛑',
      ephemeral: true,
    });
    return;
  }
}

module.exports = { joinRaid };
