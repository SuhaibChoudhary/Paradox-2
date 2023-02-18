const { cooldown } = require("../handlers/functions");
const client = require("../index");
const prefix = "$$";
const { PermissionFlagsBits } = require("discord.js");
client.on("messageCreate", async (message) => {


  if (!message.guild.members.me.permissionsIn(message.channel.id).has(PermissionFlagsBits.SendMessages)) return;
  if (message.author.bot || !message.guild) return;
  let args = prefix.length ? message.content.slice(prefix.toLowerCase().length).trim().split(/ +/g) : message.content.startsWith(prefix) == true ? message.content.slice(prefix.length).trim().split(/ +/g) : message.content.trim().split(/ +/g);

  let cmd = args.shift()?.toLowerCase();
  const command =
    client.mcommands.get(cmd) ||
    client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
  if (!command) return;
  if (command) {
    if (
      command.userPermissions &&
      !message.member.permissions.has(command.userPermissions)
    ) {
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