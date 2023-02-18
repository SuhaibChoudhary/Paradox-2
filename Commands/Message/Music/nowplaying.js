const discord = require("discord.js")
module.exports = {

  name: "nowplaying",
  description: "lock all channels",
  category: "antiraid",
  userPermissions: [discord.PermissionFlagsBits.SendMessages],
  botPermissions: [discord.PermissionFlagsBits.SendMessages],
  run: async (client, message, args) => {

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | I'm playing **\`${song.name}\`**, by ${song.user}`)

  }
}