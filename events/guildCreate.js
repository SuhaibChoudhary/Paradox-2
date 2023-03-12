const client = require("../index");
const { EmbedBuilder, ChannelType } = require("discord.js");

client.on("guildCreate", async(guild) =>{
  
const webhookClient = client.channels.cache.get(client.config.guildJoin);
  let mc = guild.memberCount.toString();
const joinEmbed = new EmbedBuilder()
  .setColor("Red")
  .setThumbnail(guild.iconURL())
  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
  .setTitle(guild.name)
  .addFields({ name: 'Owner Id', value:  guild.ownerId})
  .addFields({ name: 'Members', value:  mc})
  .setTimestamp()
 await webhookClient.send({embeds: [joinEmbed]})
});