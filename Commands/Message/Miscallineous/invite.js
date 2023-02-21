const discord = require("discord.js");
const { ButtonStyle, ButtonBuilder, ActionRowBuilder,EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "invite",
  category: "",
  aliases: "",
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
  run: async (client, message, args) => {
const embed = new EmbedBuilder()
  .setTitle("Invite Noisy")
  .setThumbnail(client.user.displayAvatarURL())
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
    .setDescription(`**[Noisy](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) \n\nNeed Help \n[Support Server](https://discord.gg/noisy)**`)
  .setFooter({text:"Thanks fro using noisy bot!!"})
    .setTimestamp()
    

   const row = new ActionRowBuilder()
			.addComponents(
		  new ButtonBuilder()
        .setLabel("Support Server")
        .setURL("https://discord.gg/noisy")
        .setStyle(ButtonStyle.Link)
       
			)
message.reply({embeds: [embed], components: [row]} )
  }
}