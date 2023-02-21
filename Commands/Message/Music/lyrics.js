const { Message, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const client = require("../../../index");
const { Queue } = require("distube");
const findLyrics = require("simple-find-lyrics");

module.exports = {
  name: "lyrics",
  aliases: ["lr"],
  description: `Find Lyrics Of Current Song`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: true,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
run: async (client, message, args) => {
    // Code
    
    
    const { lyrics } = await findLyrics(args.join(" "));

  if(lyrics){
    return message.reply(lyrics)
    
  }
  message.reply("can't find lytics")
  },
};