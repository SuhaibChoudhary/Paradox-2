const client = require("../index");
const { EmbedBuilder, SelectMenu } = require("discord.js");
const { readdirSync } = require("fs");


client.on("interactionCreate", async (interaction) => {
const embed = new EmbedBuilder()
  .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
.setFooter({text: "Thanks For Selecting Noisy!", iconURL: client.user.displayAvatarURL()})

  
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
		
	} else if (selected === 'music') {
  const Mcommands = client.mcommands.filter((x) => x.category && x.category === "Music").map((x) =>  `\`${x.name}\``);
  
embed.setTitle(`Music [${Mcommands.length}]`)
  embed.setDescription(Mcommands.join(', '))
  interaction.followUp({
       embeds: [embed],
        ephemeral: true,
      })
		
	}
}

});