const client = require("../index");
const { EmbedBuilder, SelectMenu } = require("discord.js");
const embed = new EmbedBuilder();

client.on("interactionCreate", async (interaction) => {
const queue = client.distube.getQueue(interaction.message);


if (!interaction.isSelectMenu()) return;

  
if (interaction.customId === 'songPlay') {
  if (!interaction.member.voice.channel) return interaction.reply(`**${client.emotes.error} : You can not access this fuction without join voice channel!!**`)

   if (interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return interaction.reply(`**${client.emotes.error} : For using this function join voice channel there already playing!!**`)
  
    await interaction.deferUpdate();
if(queue){

	const selected = interaction.values[0];

	if (selected === 'filter_nightcore') {
embed.setDescription(`**${client.emotes.success} : Nightcore filter succesfully enabled**`)
queue.filters.add("nightcore");
  interaction.followUp({
        embeds: [embed],
        ephemeral: true,
      })
	} else if (selected === 'filter_reset') {
embed.setDescription(`**${client.emotes.success} : Resetting filter on this song sucessfully**`)
  interaction.followUp({
       embeds: [embed],
        ephemeral: true,
      })
		queue.filters.clear();
	}
}
}
});