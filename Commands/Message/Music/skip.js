const discord = require("discord.js")
module.exports = {

  name: "skip",
  description: "lock all channels",
  category: "antiraid",
  userPermissions: [discord.PermissionFlagsBits.SendMessages],
  botPermissions: [discord.PermissionFlagsBits.SendMessages],
  run: async (client, message, args) => {

    const queue = client.distube.getQueue(message);


    if (!queue) return message.channel.send(` | There is nothing in the queue right now!`)

    if (!queue.autoplay && queue.songs.length == 1)
    queue.stop();
else
    queue.skip();
message.reply("skipped the song")
  }

}