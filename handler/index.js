const { deployCommands } = require('./deployCommands.js');
const { loadEvents } = require('./loadEvents.js');
const { loadCommands } = require('./loadCommands.js');
const { handleClick } = require('./buttonEventHandler.js');

module.exports = { deployCommands, loadCommands, loadEvents, handleClick };
