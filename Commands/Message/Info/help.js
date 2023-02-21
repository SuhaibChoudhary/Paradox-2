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
          .setCustomId('select')
          .setPlaceholder('Noisy Always Awsome')
          .addOptions([
            {
              label: 'Info',
              description: 'This is a description',
              value: 'first_option',

            },
            {
              label: 'Music',
              description: 'This is also a description',
              value: 'second_option',
              emoji: "1076001290141835324",
            },
            {
              label: 'Moderation',
              description: 'This is a description as well',
              value: 'third_option',
            },
          ]),
      );
    await message.reply({ embeds: [embed], components: [row] });
  }
}
