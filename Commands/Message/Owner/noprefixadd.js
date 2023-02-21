const { EmbedBuilder } = require("discord.js");
const db = require("../../../Database/noprefix.js");

module.exports = {
  name: "noprefixadd",
  aliases: "npa",
  cooldown: "5",
  run: async (client, message, args) => {
    const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
   if (!user){
     const embed1 = new EmbedBuilder()
      .setDescription(`**${client.emotes.error} : Can't find user you provide for no prefix**`)
    message.channel.send({ embeds: [embed1] });
   return;
  };

     let findDB = await db.findOne({
      ClientId: client.user.id
    });

  const checkNoPrefix = findDB.noprefixids.filter(g => g == user.id);
  if (checkNoPrefix.length) {
     const embed1 = new EmbedBuilder()
      .setDescription(`**${client.emotes.error} : ${user} have alreay no prefix no his id!!**`)
    message.channel.send({ embeds: [embed1] });
   return;
  };
    
    if (!findDB) {
      findDB = new db({
        ClientId: client.user.id,
        noprefixids: []
      })
      await findDB.save();
    }
    findDB.noprefixids.push(user.id)
 await findDB.save();
    const embed = new EmbedBuilder()
      .setDescription(`**${client.emotes.success} : Succesfully added no prefix on ${user}**`)
    message.channel.send({ embeds: [embed] });
   
   

    
  }
}