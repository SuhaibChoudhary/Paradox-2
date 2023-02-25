const { Constants } = require('discord.js')
const discord = require("discord.js")
module.exports = {
  name: 'leave',
  aliases: ['dc', " disconnect"],
  category: "Music",
  userPermissions: [discord.PermissionFlagsBits.Connect],
  botPermissions: [discord.PermissionFlagsBits.Speak, discord.PermissionFlagsBits.Connect],
  run: async (client, message, args) => {

    if (!message.guild.members.me.voice.channel) return message.channel.send(`**${client.emotes.error} : i am not in any voice channel why you want to disconnect me?**`)
    let voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | You must be in a voice channel or enter a voice channel id!`
      )
    }

    if (message.member.voice.channelId !== message.guild.members.me.voice.channelId) return message.reply(`**${client.emotes.error} : For using this function join voice channel there already playing!!**`)

    client.distube.voices.leave(message)
    message.react(client.emotes.leave)
  }
}