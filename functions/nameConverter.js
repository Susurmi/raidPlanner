function raidNameConverter(choice) {
  if (choice === 'vog') {
    return 'Gläserne Kammer';
  }
  if (choice === 'lw') {
    return 'Letzter Wunsch';
  }
  if (choice === 'kf') {
    return 'Königsfall';
  }
  if (choice === 'crypt') {
    return 'Tiefsteinkrypta';
  }
}

module.exports = { raidNameConverter };
