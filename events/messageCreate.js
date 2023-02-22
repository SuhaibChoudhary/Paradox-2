const { cooldown } = require("../handlers/functions");
const client = require("../index");
const { ids } = require("../owner.json");
const db = require("../Database/noprefix.js");
const prefix = "!!";


const { PermissionFlagsBits } = require("discord.js");
client.on("messageCreate", async (message) => {

  if (!message.guild.members.me.permissionsIn(message.channel.id).has(PermissionFlagsBits.SendMessages)) return;
  if (message.author.bot || !message.guild) return;

let npDB = await db.findOne({
    ClientId: client.user.id
  })
  if (!npDB) {
    npDB = new db({
     ClientId: client.user.id,
      noprefixids: []
    })
  }
  const checkNoPrefix = npDB.noprefixids.filter(g => g == message.author.id);
  if (!checkNoPrefix.length) {
    if (!message.content.toLowerCase().startsWith(prefix)) return;
  }

  let args = !checkNoPrefix.length ? message.content.slice(prefix.toLowerCase().length).trim().split(/ +/g) : message.content.startsWith(prefix) == true ? message.content.slice(prefix.length).trim().split(/ +/g) : message.content.trim().split(/ +/g);


  let cmd = args.shift()?.toLowerCase();

  const command =
    client.mcommands.get(cmd) ||
    client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
  if (!command) return;
  if (command) {
    if (command.userPermissions && !message.member.permissions.has(command.userPermissions)) {
      return message.reply({
        content: `you don't have enough permissions !!`,
      });

    } else if (
      command.botPermissions &&
      !message.guild.members.me.permissions.has(command.botPermissions)
    ) {
      return message.reply({
        content: `i don't have enough permissions !!`,
      });
    } else {
      command.run(client, message, args);
    }
  }
 
});
