function getImage(raidName) {
  if (raidName === 'vog') {
    return 'https://i.postimg.cc/K87CVf6D/vog.png';
  }
  if (raidName === 'lw') {
    return 'https://i.postimg.cc/HnvtQTZ3/lw.png';
  }
  if (raidName === 'kf') {
    return 'https://i.postimg.cc/GpnxP7K0/kf.png';
  }
  if (raidName === 'crypt') {
    return 'https://i.postimg.cc/bYV0VNg9/crypt.png';
  }
}

module.exports = { getImage };
