const discord = require("discord.js")
module.exports = {

    name: "volume",
    description: "lock all channels",
    category: "antiraid",
    userPermissions: [discord.PermissionFlagsBits.SendMessages],
    botPermissions: [discord.PermissionFlagsBits.SendMessages],
    run: async (client, message, args) => {
      
  const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`| There is nothing in the queue right now!`)
      if(!args[0]) return message.reply("please specify a number to set volume!!")
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(` | Please enter a valid number!`)
    queue.setVolume(volume)
    message.channel.send(` | Volume set to \`${volume}\``)
   
    }
}