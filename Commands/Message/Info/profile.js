const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "profile",
  cooldown: "5",
  aliases: "badge",
  run: async (client, message, args) => {
    let badgeRoles = {
      BugRole: '1078242380936908800',
      SpecialRole: '1078302998553440327',
      BoosterRole: '1068585302270156800'
    }

    
    let array = [];
    let guild = await client.guilds.fetch('1066224579342774302');
    //ayan sun last me messageCreate me ek function banaya tha owner only fix krdiyo pls na ho to bana diyo
    let member = (await guild.members.fetch(message.author.id).catch(() => { return null })) || null;
    if (member) {
      if (member._roles?.includes(badgeRoles['BugRole'])) array.push(`${client.emotes.bughunter} Bug Hunter`);
      if (member._roles?.includes(badgeRoles['SpecialRole'])) array.push(`${client.emotes.specialone} Special One`);
      if (member._roles?.includes(badgeRoles['BoosterRole'])) array.push(`${client.emotes.booster} Booster`);

      let embed = new EmbedBuilder()
        .setAuthor({
          name: message.author.tag,
          iconURL: client.user.displayAvatarURL()
        })
        .setThumbnail(message.author.displayAvatarURL())
        .addFields([{
          name: 'Badges:',
          value: `${array.length == 0 ? 'No Badges Found!' : array.join('\n')}`
        }])
        .setTimestamp()
        .setColor('Blue')
   
      message.reply({
        embeds: [embed]
      })
    } else {
      let embed = new EmbedBuilder()
        .setAuthor({
          name: `Badge For ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL()
        })
        .addFields([{
          name: 'Badges:',
          value: `${array.length == 0 ? 'No Badges Found!' : array.join('\n')}`
        }])
        .setTimestamp()
        .setColor('Blue')
      message.reply({
        embeds: [embed]
      })
    }
  }
}