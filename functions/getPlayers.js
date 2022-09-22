function getPlayers(participants) {
  let players = {
    titan: '',
    warlock: '',
    hunter: '',
    counter: 1,
  };

  participants.forEach((player) => {
    if (player.class === 'titan') {
      players.titan += `${player.discordTag}\n`;
      players.counter + 1;
    }
    if (player.class === 'warlock') {
      players.warlock += `${player.discordTag}\n`;
      players.counter + 1;
    }
    if (player.class === 'hunter') {
      players.hunter += `${player.discordTag}\n`;
      players.counter += 1;
    }
  });

  if (players.titan === '') {
    players.titan += '\u200b';
  }
  if (players.warlock === '') {
    players.warlock += '\u200b';
  }
  if (players.hunter === '') {
    players.hunter += '\u200b';
  }

  return players;
}

module.exports = { getPlayers };
