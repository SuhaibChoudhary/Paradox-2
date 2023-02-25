const discord = require("discord.js")
module.exports = {

  name: "stop",
  description: "randomly playing songs for you",
  category: "Music",
  userPermissions: [discord.PermissionFlagsBits.Connect],
  botPermissions: [discord.PermissionFlagsBits.Speak, discord.PermissionFlagsBits.Connect],
  run: async (client, message, args) => {

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(` There is nothing in the queue right now!`)
    queue.stop()
    message.channel.send(`Stopped!`)
  }
}