const { ApplicationCommandType, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder, voiceChannel } = require("discord.js");
const discord = require("discord.js")
module.exports = {
  name: "play",
  description: "Playin for members!!",
  aliases: ["p"],
  usage: "$play <song name>",
  category: "Music",
  type: ApplicationCommandType.ChatInput,
  userPermissions: [discord.PermissionFlagsBits.Connect],
  botPermissions: [discord.PermissionFlagsBits.Speak, discord.PermissionFlagsBits.Connect],
  run: async (client, message, args) => {
    const embed = new EmbedBuilder();

    const queue = client.distube.getQueue(message);
    if (!message.member.voice.channel) {
      embed.setColor("Red").setDescription("You mst be in a voice channel to execute this command.");
      return message.reply({ embeds: [embed], ephemeral: true });
    }

    if (!message.member.voice.channelId == message.guild.members.me.voice.channelId) {
      embed.setColor("Red").setDescription(`you cant usse the music player as it is already active in <#${interaction.guild.members.me.voice.channelId}>`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    client.distube.play(message.member.voice.channel, args.join(" "), {
      member: message.member,
      user: message.user,
      textChannel: message.channel,
      message
    })

  }
}
