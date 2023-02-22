const discord = require("discord.js");
const econfig = require('./emoji.json');
const playerData = require('./Database/playerData');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Client, GatewayIntentBits, Partials, Collection, ActivityType, SelectMenuBuilder } = require("discord.js");
const fs = require("fs");
const { readdirSync } = require("fs");
const { mongoUrl } = require("./settings/config.js")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
});

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.scommands = new Collection();
client.mcommands = new Collection();
client.emotes = econfig.emoji;
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});

module.exports = client;

//handler start from there

["event_handler", "slash_handler", "cmd_handler"].forEach((file) => {
  require(`./handlers/${file}`)(client);
});

const { connect } = require("mongoose");
connect(mongoUrl, {
}).then(() => console.log("the client is now connected with database."));

// connect to discord and mogodb
client.login(process.env.TOKEN);

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``



client.distube
  .on('playSong', async (queue, song) => {
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
      .setAuthor({ name: "Now Playing", iconURL: client.user.displayAvatarURL() })
      .setThumbnail(song.thumbnail)
      .setTitle(`**${client.emotes.song} : ${song.name}**`)
      .addFields({ name: `**${client.emotes.duration} Duration :**`, value: song.formattedDuration },
        { name: "Requested By", value: `<@${song.user.id}>` })
      .setFooter({ text: status(queue) })

    let msgSent = await queue.textChannel.send({ embeds: [playse], components: [row1, row] });
    let playerDBData = await playerData.findOne({ id: queue.textChannel.guild.id })
    if (!playerDBData) {
      playerDBData = new playerData({
        id: queue.textChannel.guild.id,
        messageId: msgSent.id,
        messageChannel: msgSent.channel.id
      })
      await playerDBData.save()
    } else {
      playerDBData.messageId = msgSent.id;
      playerDBData.messageChannel = msgSent.channel.id;
      await playerDBData.save();
    }
  }
  ).on('finishSong', async (queue) => {

    let playerDBData = await playerData.findOne({ id: queue.textChannel.guild.id })
    if (!playerDBData) return;

    queue.textChannel.messages.fetch(playerDBData.messageId)
      .then(message => message.delete()).catch(console.error);


  }).on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
  }).on('addSong', (queue, song) => {
    queue.textChannel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
  }
  )

