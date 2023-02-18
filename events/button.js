const client = require("../index");
client.on("interactionCreate", async (interaction) => {
  const queue = client.distube.getQueue(interaction.message);
  if (interaction.isButton()) {
    await interaction.deferUpdate().catch(null);

    if (interaction.customId === "previous-btn") {

      if (!queue) return;
      queue.previous()
      interaction.followUp({
        content: `${queue.previous.name} now playing`,
        ephemeral: true,
      })

    }


    if (interaction.customId === "pause-btn") {
      if (!queue.paused){
      interaction.followUp({
        content: "you pause the music",
        ephemeral: true,
      })
      queue.pause();
      }
    }
    
    if (interaction.customId === "resume-btn") {
      if (queue.paused){
      interaction.followUp({
        content: "you resume the music",
        ephemeral: true,
      })
      queue.resume();

    }
    }
    if (interaction.customId === "skip-btn") {
      interaction.followUp({
        content: `${client.emotes.skip} : you skip the music`,
        ephemeral: true,
      })
      if (!queue.autoplay && queue.songs.length == 1)
        queue.stop();
      else
        queue.skip();

    }
  }
})