const discord = require("discord.js");
const econfig = require('./emoji.json');
const {  ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Client, GatewayIntentBits, Partials, Collection, ActivityType } = require("discord.js");
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
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``



client.distube
  .on('playSong', async (queue, song) => {

    const row = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
				.setCustomId('previous-btn')
        .setEmoji(client.emotes.previous)			
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
    
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
    .setAuthor({name: "Now Playing", iconURL: client.user.displayAvatarURL()})
      .setThumbnail(song.thumbnail)
    .setTitle(`**${client.emotes.song} : ${song.name}**`)
    .addFields({name: `**${client.emotes.duration} Duration :**`, value: song.formattedDuration},
               {name: "Requested By", value: `<@${song.user.id}>`})
            .setFooter({text: status(queue)})
  
    await queue.textChannel.send({embeds: [playse], components: [row] });
   

}
 )

  client.distube.on('addSong', (queue, song) =>{
    queue.textChannel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
      }
    )
  