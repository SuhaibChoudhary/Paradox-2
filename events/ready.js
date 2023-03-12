
const { ActivityType } = require("discord.js");

const client = require("../index");
client.on("ready", async() => {
client.user.setActivity(`${client.guilds.cache.size} Guilds | We Need Now ${75 - client.guilds.cache.size} Guilds.`, {type: ActivityType.Watching});
console.log(`${client.user.username} Now Logged In`);

});