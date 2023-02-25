const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, User } = require('discord.js');
const db = require("../../../Database/noprefix.js");

module.exports = {
  name: "noprefix",
  cooldown: "5",
  aliases: ["nop"],
  ownersOnly: true,
  run: async (client, message, args) => {
    let dataArg = args[0];
    if (!dataArg) return message.reply({
      content: 'Please specify `add`, `remove`, `list`'
    })
    if (dataArg.toLowerCase() == 'add') {
      const user = await client.users.fetch(args[1]);

      if (!user) {
        const embed1 = new EmbedBuilder()
          .setDescription(`**${client.emotes.error} : Can't find user you provide for no prefix**`)
        message.channel.send({
          embeds: [embed1]
        });
        return;
      };
      let findDB = await db.findOne({
        ClientId: client.user.id
      });
      const checkNoPrefix = findDB.noprefixids.filter(g => g == user.id);
      if (checkNoPrefix.length) {
        const embed1 = new EmbedBuilder()
          .setDescription(`**${client.emotes.error} : ${user} have alreay no prefix no his id!!**`)
        message.channel.send({
          embeds: [embed1]
        });
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
      return message.channel.send({
        embeds: [embed]
      });
    } else if (dataArg.toLowerCase() == 'list') {
      const firstId = 'first';
      const backId = 'back';
      const nextId = 'next';
      const lastId = 'last'
      const firstButton = new ButtonBuilder({
        style: 2,
        label: 'First',
        customId: firstId
      });
      const backButton = new ButtonBuilder({
        style: 2,
        label: 'Back',
        customId: backId
      });
      const nextButton = new ButtonBuilder({
        style: 2,
        label: 'Next',
        customId: nextId
      });
      const lastButton = new ButtonBuilder({
        style: 2,
        label: 'Last',
        customId: lastId
      });
      const result = await db.findOne({ ClientId: client.user.id });
      const generateEmbed = async start => {
        const queue = [];
        let o = 0;
        for (const x of result.noprefixids) {
          let user = (await client.users.fetch(x).catch(() => { return null })) || null
          if (user == null) return;
          queue.push(`${((o++) + 1)}. ${user.tag} [${x}]`)
        }
        const current = queue.slice(start, start + 10);
        const msg = `\`\`\`yml\n✔ NoPrefix List ✔\n\n${current.length == 0 ? 'No User(s) Available' : current.join('\n')}\n\`\`\`\n\`${start + 1}\`-\`${start + current.length}\` Out Of \`${result.noprefixids.length}\``;
        return msg;
      }
      const canFitOnOnePage = result.noprefixids.length <= 10
      const embedMessage = await message.reply({
        content: await generateEmbed(0),
        components: canFitOnOnePage ?
          [] :
          [new ActionRowBuilder({
            components: [nextButton]
          })]
      }).catch(e => {
        return;
      })
      if (canFitOnOnePage) return;
      const collector = embedMessage.createMessageComponentCollector();
      let currentIndex = 0
      collector.on('collect', async interaction => {
        interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
        await interaction.update({
          content: await generateEmbed(currentIndex),
          components: !result.noprefixids.length ? [] : [
            new ActionRowBuilder({
              components: [
                ...(currentIndex ? [backButton] : []),
                ...(currentIndex + 10 < result.noprefixids.length ? [nextButton] : [])
              ]
            })
          ]
        })
      })
    } else if (args[0].toLowerCase() == 'remove') {
      const user = await client.users.fetch(args[1]);
      if (!user) {
        const embed1 = new EmbedBuilder()
          .setDescription(`**${client.emotes.error} : Can't find user you provide for no prefix**`)
        message.channel.send({
          embeds: [embed1]
        });
        return;
      };
      let findDB = await db.findOne({
        ClientId: client.user.id
      });
      if (!findDB) {
        findDB = new db({
          ClientId: client.user.id,
          noprefixids: []
        })
        await findDB.save();
      }
      const checkNoPrefix = findDB.noprefixids.filter(g => g == user.id);
      if (checkNoPrefix.length == 0) {
        const embed1 = new EmbedBuilder()
          .setDescription(`**${client.emotes.error} : ${user} don't have no prefix on his id!!**`)
        message.channel.send({
          embeds: [embed1]
        });
        return;
      };
      findDB.noprefixids = findDB.noprefixids.filter(x => x != user.id);
      await findDB.save();
      const embed = new EmbedBuilder()
        .setDescription(`**${client.emotes.success} : Succesfully removed ${user} from no prefix**`)
      return message.channel.send({
        embeds: [embed]
      });
    }
  }
}