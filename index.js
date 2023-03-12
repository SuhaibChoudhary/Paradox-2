const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
});

const discord = require("discord.js");
const econfig = require('./emoji.json');
const config = require("./settings/config.js");
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
client.config = config;
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


client.distube
  .on('playSong', async (queue, song) => {

    const playse = new discord.EmbedBuilder()
      .setColor(client.config.embed)
    .setDescription(`**${client.emotes.song} Started Playing [${song.name}](${client.config.support})**`)
    .setFooter({text: `Use ${client.config.prefix}Panel for adding filters and buttons.`, iconURL: queue.textChannel.guild.iconURL()})
    let msgSent = await queue.textChannel.send({ embeds: [playse] });
   
  }
  ).on('finishSong', async (queue) => {


  }).on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
  }).on('addSong', (queue, song) => {
    const addSong = new discord.EmbedBuilder()
    .setTitle("Added To Queue")
    .setColor(client.config.embed)
    .setDescription(`[${song.name}](${client.config.support})`)
    queue.textChannel.send({embeds: [addSong]});
  }).on('error', (channel, e) => {
    const erorSong = new discord.EmbedBuilder()
    .setTitle("Error Found")
    .setDescription(`[${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}](${client.config.support})`)
    .setColor("#ff0000")
    if (channel) channel.send({embeds: [erorSong]})
    else console.error(e)
  }).on('finish', queue => {
    const emptySong = new discord.EmbedBuilder()
    .setColor(client.config.embed)
    .setTitle("Thank you for using our service!")
      .setImage(client.config.banner)
    .setDescription(`Come join our [support server](${client.config.support}) to get information about updates, issues and for discussions about bot features!`)
   queue.textChannel.send({embeds: [emptySong]})
  })
.on('searchNoResult', (message, query) =>
   message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`))