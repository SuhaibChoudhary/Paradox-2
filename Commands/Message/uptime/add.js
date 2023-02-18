const discord = require("discord.js");
const request = require("request");
const db = require("../../../database/urls");
module.exports = {

  name: "add",
  description: "lock all channels",
  category: "antiraid",
  userPermissions: [discord.PermissionFlagsBits.SendMessages],
  botPermissions: [discord.PermissionFlagsBits.SendMessages],
  run: async (client, message, args) => {

    if (!args[0]) return message.channel.send("Please Provide A Web Link Which You Want To Host!!")


    // if(!args[0].startsWith("https://replit.com/")) return message.reply("We Only Support Replit Projects!!")

  //  request(args[0])
   //   .on('response', async function(response) {
   //     console.log(response.statusCode)
    //    if (!response.statusCode === "200")  {    await message.channel.send(`your web not ready for online 24/7 use`)
   //     }
    //  })
    
db.links.push(args[0])
await db.save()
    
  }
}
