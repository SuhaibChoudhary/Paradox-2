const discord = require("discord.js")
module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  inVoiceChannel: true,
  userPermissions: [discord.PermissionFlagsBits.Connect],
  botPermissions: [discord.PermissionFlagsBits.Speak, discord.PermissionFlagsBits.Connect],
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)

    let options = args[0];
    if (options == "on") {
      queue.setRepeatMode(1)
      message.channel.send("**Loop Mode Is Now Active**")
    } else if (options == "off") {
      queue.setRepeatMode(0)
      message.channel.send("**Loop Mode Is Now Deactive**")
    } else {
      message.channel.send("**PLease Select A Option Between `\off\`, `\on\`**")
    }

  }
}