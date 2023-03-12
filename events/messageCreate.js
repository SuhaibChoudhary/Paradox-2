const discord = require("discord.js");
const { cooldown } = require("../handlers/functions");
const client = require("../index");
const { ids } = require("../owner.json");
let prefix;

const {
  PermissionFlagsBits
} = require("discord.js");
client.on("messageCreate", async (message) => {

  if (!message.guild.members.me.permissionsIn(message.channel.id).has(PermissionFlagsBits.SendMessages)) return;
  
  if (message.author.bot || !message.guild) return;
  
  let mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, "gi"));

  if (mentionRegex) {
    prefix = `${mentionRegex[0]}`;
  } else {
    prefix = client.config.prefix;
  }

const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            const embedM = new discord.EmbedBuilder()
                .setAuthor({name:` ${message.guild.name}`,
      iconURL: message.guild.iconURL()})
      .setImage(client.config.banner)     .setColor(client.config.embed)
                .setFooter({ text: `Requested by ` + message.author.username , iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setTitle(`Thanks For Using ${client.user.username}`)
    .addFields([
            { name: 'Prefix', value: client.config.prefix, inline: true }]);
message.channel.send({ embeds: [embedM] }) 

        };       

  
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  let args = prefix.length ? message.content.slice(prefix.toLowerCase().length).trim().split(/ +/g) : message.content.startsWith(prefix) == true ? message.content.slice(prefix.length).trim().split(/ +/g) : message.content.trim().split(/ +/g);


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
    } else if (command?.ownersOnly == true && !ids.includes(message.author.id)) {
      return message.reply({
        content: `You don't have permission to use this command!`,
      });
    } else if (command.inVoiceChannel && !message.member.voice.channel) {
      return message.reply(`**${client.emotes.error} | You can't use this command without joining voice channel**`)
    } else {
      command.run(client, message, args);
    }
  }

});