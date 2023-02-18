const { Client } = require("discord.js"); const { readdirSync } = require("fs");

/**
*
* @param { client } client
*/

module.exports = async (client) => {
let eventCount = 0;
readdirSync("./events")
.filter((f) => f.endsWith(".js")) .forEach((event) => {
require(`../events/${event}`);
eventCount++;
  console.log(`${event} File Loaded`);
});
  
console.log(`${eventCount} event loaded`);
};