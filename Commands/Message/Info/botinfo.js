const { owners } = require("../../../owner.json");
const { ApplicationCommandType, ChannelType,  Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder, voiceChannel, ActionRowBuilder, Events, SelectMenuBuilder } = require("discord.js");
const discord = require("discord.js");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  name: "botinfo",
  aliases: ["bi"],
  description: "help",
  category: "Info",
  type: ApplicationCommandType.ChatInput,
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Speak, PermissionFlagsBits.Connect],

  run: async (client, message, args) => {

let mc = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
   
let tc = await client.channels.cache.filter(c => c.type === ChannelType.GuildText).size;

let vc = await client.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;

let cc = await client.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;

    let ow = await owners.map( o => `[${o.name}](https://discord.com/users/${o.id})`);

    const embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({ name: `${client.user.username} Stats /Botinfo Panel`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`**Bot Name: ${client.user.username}\nBotID : ${client.user.id}\nCommands: ${client.mcommands.size}**`)
      .setColor(client.config.embed)
.addFields({name: "Members Count" ,value:`${mc} Members | ${client.users.cache.size} Cached Members`},
           {name: `Channels ${client.channels.cache.size}`, value: `${client.emotes.channelText} ${tc} | ${client.emotes.volume} ${vc} | ${client.emotes.channelCategory} ${cc}`},
           {name: "Team", value: ow.join(`\n`)})

    await message.reply({ embeds: [embed] });
  }
}
