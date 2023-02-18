const {
  ApplicationCommandType,
  Client,
  CommandInteraction,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  name: "ping",
  description: "get ping of bot",
  category : "Utility",
  type: ApplicationCommandType.ChatInput,
  userPermissions: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.SendMessages],
  
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // code
    await interaction.reply({
      content: "Pong !!",
    });
  },
};