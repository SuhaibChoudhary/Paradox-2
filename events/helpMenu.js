const client = require("../index");
const { EmbedBuilder, SelectMenu } = require("discord.js");
const embed = new EmbedBuilder();

client.on("interactionCreate", async (interaction) => {



if (!interaction.isSelectMenu()) return;

  
if (interaction.customId === 'helpMenu') {
  
    await interaction.deferUpdate();


	const selected = interaction.values[0];

	if (selected === 'info') {
embed.setDescription(`**botinfo, help, **`)

  interaction.followUp({
        embeds: [embed],
        ephemeral: true,
      })
	} else if (selected === 'miscallineous') {
embed.setDescription(`**ping, invite**`)
  interaction.followUp({
       embeds: [embed],
        ephemeral: true,
      })
		
	}
}

});