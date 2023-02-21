const { ApplicationCommandType, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder, voiceChannel, ActionRowBuilder, Events, SelectMenuBuilder } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  name: "botinfo",
  aliases: ["bi"],
  description: "help",
  category: "Info",
  type: ApplicationCommandType.ChatInput,
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Speak, PermissionFlagsBits.Connect],

  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({ name: `${client.user.username} Stats /Botinfo Panel`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`**Noisy Bot Interface!! \n\nBot Name: ${client.user.username}\nBotID : ${client.user.id}\nCommands: ${client.mcommands.size}**`)
 
      
    await message.reply({ embeds: [embed]});
  }
}
