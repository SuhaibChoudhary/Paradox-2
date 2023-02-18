const discord = require("discord.js")
module.exports = {

    name: "resume",
    description: "lock all channels",
    category: "Music",
    userPermissions: [discord.PermissionFlagsBits.SendMessages],
    botPermissions: [discord.PermissionFlagsBits.SendMessages],
    run: async (client, message, args) => {
      
   const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Resumed the song for you :)')
    } else {
      message.channel.send('The queue is not paused!')
    }
   
    }
}