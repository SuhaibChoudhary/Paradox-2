const { Constants } = require('discord.js')

module.exports = {
  name: 'join',
  category: "Music",
  run: async (client, message, args) => {

    if(message.guild.members.me.voice.channel) return message.channel.send(`**${client.emotes.error} : I am already in a voice channel first disconnect me else wait to auto disconnect function!!**`)
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${client.emotes.error} | ${args[0]} is not a valid voice channel!`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | You must be in a voice channel or enter a voice channel id!`
      )
    }
    client.distube.voices.join(voiceChannel)
    message.react(client.emotes.volume)
  }
}