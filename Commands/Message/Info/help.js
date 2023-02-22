const { ApplicationCommandType, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder, voiceChannel, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, SelectMenuBuilder } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  name: "help",
  description: "help",
  category: "Info",
  type: ApplicationCommandType.ChatInput,
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Speak, PermissionFlagsBits.Connect],

  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`**Noisy Is A Discord Music Bot Made To Provide You With Many Breathtaking Features And Quality Music\n\nTo get started, join a voice channel and type $play to play a song! To get information about a specific command type $help <command name>.**\n`)
.addFields({name: "Default Prefix :", value: "`$`"})
    
    const row = new ActionRowBuilder()
      
      .addComponents(
        new SelectMenuBuilder()
          .setCustomId('helpMenu')
          .setPlaceholder('Choose A Page From Menu Below')
          .addOptions([
            {
              label: 'Info',
              description: 'This is a description',
              value: 'info',
              emoji: '1077495959703007283'

            },
            {
              label: 'Miscallineous',
              description: 'This is also a description',
              value: 'miscallineous',
              emoji: "1077496178612125727",
            },
            {
              label: 'Music',
              description: 'This is a description as well',
              value: 'music',
              emoji: '1077496268433137754'
            },
          ]),
      );
    const rowb = new ActionRowBuilder()
			.addComponents(
		  new ButtonBuilder()
        .setLabel("Support Server")
        .setURL("https://discord.gg/noisy")
        .setStyle(ButtonStyle.Link)
       
			)
    await message.reply({ embeds: [embed], components: [row, rowb] });
  }
}
