const discord = require("discord.js")
module.exports = {

    name: "autoplay",
    description: "randomly playing songs for you",
    category: "Music",
    userPermissions: [discord.PermissionFlagsBits.SendMessages],
    botPermissions: [discord.PermissionFlagsBits.SendMessages],
    run: async (client, message, args) => {
      
  const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(` There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
   
    }
}