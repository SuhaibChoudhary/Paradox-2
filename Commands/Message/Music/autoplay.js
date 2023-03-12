const discord = require("discord.js")
module.exports = {

  name: "autoplay",
  description: "randomly playing songs for you",
  category: "Music",
  inVoiceChannel: true,
  userPermissions: [discord.PermissionFlagsBits.Connect],
  botPermissions: [discord.PermissionFlagsBits.Speak, discord.PermissionFlagsBits.Connect],
  run: async (client, message, args) => {

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(` There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`**${client.emotes.success} | toPlay: \`${autoplay ? 'On' : 'Off'}\`**`)

  }
}