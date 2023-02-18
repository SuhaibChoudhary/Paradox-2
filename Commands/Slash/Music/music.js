const { ApplicationCommandType, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder, voiceChannel } = require("discord.js");

module.exports = {
  name: "music",
  description: "Playin for members!!",
  category: "Music",
  type: ApplicationCommandType.ChatInput,
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Speak, PermissionFlagsBits.Connect],

  run: async (client, interaction) => {
    const embed = new EmbedBuilder();

   // if(!interaction.member.voiceChannel){
    //  embed.setColor("Red").setDescription("You mst be in a voice channel to execute this command.");
    //  return interaction.reply({embeds: [embed], ephemeral: true });
    //}
   // if(!member.voice.channelId == interaction.guild.members.me.voice.channelId){
   //    embed.setColor("Red").setDescription(`you cant usse the music player as it is already active in <#${interaction.guild.members.me.voice.channelId}>`);
   //   return interaction.reply({embeds: [embed], ephemeral: true //});
    
    
   client.distube.play("1069923418633412630", "teri meri kahani", { textChannel: "1069923418633412630", member: interaction.member })
    }
  }
