const discord = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Client, GatewayIntentBits, Partials, Collection, ActivityType, SelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "panel",
  category: "Music",
  cooldown: 50,
  inVoiceChannel: true,
  run: async(client, message, args) => {
  const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const song = queue.songs[0]
    
 const row1 = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()

          .setCustomId('songPlay')

          .setPlaceholder('Want add some filters?')

          .addOptions([{
            label: 'Reset',
            value: 'filter_reset',
            emoji: "1077999159908511814",
          },
          {
            label: 'NIGHTCORE',
            value: 'filter_nightcore',
            emoji: "1077998234959630357",
          },
          {
            label: '3D',
            value: 'filter_3d',
            emoji: "1077998234959630357",
          },
          ]),
      );

    const row = new ActionRowBuilder()

      .addComponents(
        new ButtonBuilder()
          .setCustomId('lyrics-btn')
          .setEmoji(client.emotes.lyrics)
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId('pause-btn')
          .setEmoji(client.emotes.pause)
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId('resume-btn')
          .setEmoji(client.emotes.play)
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId('stop-btn')
          .setEmoji(client.emotes.stop)
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId('skip-btn')
          .setEmoji(client.emotes.skip)
          .setStyle(ButtonStyle.Secondary),
      );

    const playse = new discord.EmbedBuilder()
      .setAuthor({ name: `${client.user.username} Music Panel `, iconURL: client.user.displayAvatarURL() })
      .setThumbnail(song.thumbnail)
      .setTitle(`**${client.emotes.song} : ${song.name}**`)
      .addFields({ name: `**${client.emotes.duration} Duration :**`, value: song.formattedDuration },
        { name: "Requested By", value: `<@${song.user.id}>` })
    .setFooter({text: "Panel will delete in 30 seconds!!", iconURL: message.guild.iconURL()})
    let msgSent = await message.channel.send({ embeds: [playse], components: [row1, row] }).then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    
    
  }
}