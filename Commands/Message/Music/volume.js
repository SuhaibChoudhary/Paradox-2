
const playerData = require("../../../Database/playerData.js");
const discord = require("discord.js");

module.exports = {
  name: "volume",
  description: "lock all channels",
  aliases: ["v"],
  category: "Music",
  inVoiceChannel: true,
  userPermissions: [discord.PermissionFlagsBits.Connect],
  botPermissions: [discord.PermissionFlagsBits.Speak, discord.PermissionFlagsBits.Connect],
  run: async (client, message, args) => {
    const embed = new discord.EmbedBuilder();

    const queue = client.distube.getQueue(message)

    if (!message.member.voice.channel) {
      embed.setColor("Red").setDescription("You mst be in a voice channel to execute this command.");
      return message.reply({ embeds: [embed], ephemeral: true });
    }

    if (!message.member.voice.channelId == message.guild.members.me.voice.channelId) {
      embed.setColor("Red").setDescription(`you cant usse the music player as it is already active in <#${interaction.guild.members.me.voice.channelId}>`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
    if (!queue) {
      embed.setDescription(`**${client.emotes.error} :  There is nothing in the queue right now!**`)
      return message.reply({ embeds: [embed] });

    }

    if (args[0] > 200 || args[0] < 10) return message.channel.send(`**${client.emotes.error} : You can't set volume low then 10% and higher than 200%**`);

    if (!args[0]) {
      embed.setDescription(`**${client.emotes.error} :  please specify a number to set volume!!**`)
      return message.reply({ embeds: [embed] });
    }
    const volume = parseInt(args[0])

    if (isNaN(volume)) {
      embed.setDescription(`**${client.emotes.error} :  Please enter a valid number!!**`)
      return message.reply({ embeds: [embed] });
    }
    queue.setVolume(volume)
    message.reply({ embeds: [embed.setDescription(`**${client.emotes.success} :  Volume set to \`${volume}\`**`)] });

  }
}