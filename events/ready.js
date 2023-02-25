
const { ActivityType } = require("discord.js");

const client = require("../index");
client.on("ready", async() => {
client.user.setActivity(`Managed Premium Guilds..`, {type: ActivityType.Watching});
console.log(`${client.user.username} Now Logged In`);

});