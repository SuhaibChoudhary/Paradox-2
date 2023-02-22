const client = require("../index");
const { EmbedBuilder } = require("discord.js");

const allembed = new EmbedBuilder();
client.on("interactionCreate", async (interaction) => {
  const queue = client.distube.getQueue(interaction.message);
  if (interaction.isButton()) {
    if (!interaction.member.voice.channel) return;
    await interaction.deferUpdate().catch(null);

    if (interaction.customId === "stop-btn") {
      if (queue) {
        queue.stop()
        allembed.setDescription(`**${client.emotes.stop} : You stop the music!!**`)
        interaction.followUp({
          embeds: [allembed],
          ephemeral: true,
        })

      }
    }

    if (interaction.customId === "pause-btn") {
      if (!queue.paused) {
        allembed.setDescription(`**${client.emotes.pause} : You pause the music!!**`)
        interaction.followUp({
          embeds: [allembed],
          ephemeral: true,
        })
        queue.pause();
      }
    }

    if (interaction.customId === "resume-btn") {
      if (queue.paused) {
        allembed.setDescription(`**${client.emotes.play} : You resume the music!!**`)
        interaction.followUp({
          embeds: [allembed],
          ephemeral: true,
        })
        queue.resume();

      }
    }
    if (interaction.customId === "skip-btn") {
      if (queue) {
        allembed.setDescription(`**${client.emotes.skip} : You skipped the music!!**`)
        interaction.followUp({
          embeds: [allembed],
          ephemeral: true,
        })
        if (!queue.autoplay && queue.songs.length == 1)
          queue.stop();
        else
          queue.skip();
      }
    }
  }
})