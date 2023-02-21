const { ApplicationCommandType, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder, voiceChannel, ActionRowBuilder, Events, SelectMenuBuilder } = require("discord.js");
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
      .setDescription(`Noisy Is A Discord Music Bot Made To Provide You With Many Breathtaking Features And Quality Music \n **Owner** \nSuhaib Chaudhary#0001\n \n[Support Server](https://discord.gg/noisy) \n \n\`Choose A Page From Menu Below\``)
    const row = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
          .setCustomId('helpMenu')
          .setPlaceholder('Noisy Always Awsome')
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
              value: 'third_option',
              emoji: '1077496268433137754'
            },
          ]),
      );
    await message.reply({ embeds: [embed], components: [row] });
  }
}
