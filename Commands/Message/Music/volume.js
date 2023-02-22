
const playerData = require("../../../Database/playerData.js");
const discord = require("discord.js");

module.exports = {
    name: "volume",
    description: "lock all channels",
    category: "Music",
    userPermissions: [discord.PermissionFlagsBits.SendMessages],
    botPermissions: [discord.PermissionFlagsBits.SendMessages],
    run: async (client, message, args) => {
      const embed = new discord.EmbedBuilder();
      
  const queue = client.distube.getQueue(message)
    if (!queue) {
      embed.setDescription(`**${client.emotes.error} :  There is nothing in the queue right now!**`)
     return message.reply({ embeds: [embed]});
    
    }
      if(!args[0]){
         embed.setDescription(`**${client.emotes.error} :  please specify a number to set volume!!**`)
         return message.reply({ embeds: [embed]});
      }
    const volume = parseInt(args[0])
        
    if (isNaN(volume)) {
       embed.setDescription(`**${client.emotes.error} :  Please enter a valid number!!**`)
      return message.reply({ embeds: [embed]});
    }
      queue.setVolume(volume)
       message.reply({ embeds: [embed.setDescription(`**${client.emotes.success} :  Volume set to \`${volume}\`**`)]});
   
    }
}