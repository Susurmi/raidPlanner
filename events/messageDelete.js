const raidModel = require('../database/models/raidModel');

module.exports = {
  name: 'messageDelete',
  once: false,
  async execute(message, client) {
    const raidObject = await client.raid.find((x) => x.id === message.id);
    if (raidObject === undefined) return;
    try {
      const raidArray = client.raid;
      let index = raidArray
        .map((x) => {
          return x.id;
        })
        .indexOf(raidObject.id);
      raidArray.splice(index, 1);
      await raidModel.findOneAndDelete({ id: message.id });
    } catch (error) {
      console.log(error);
    }
  },
};
