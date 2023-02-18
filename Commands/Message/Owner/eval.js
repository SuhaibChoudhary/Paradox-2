const { codeBlock } = require("@discordjs/builders");

const discord = require("discord.js")
module.exports = {

  name: "eval",
  description: "lock all channels",
  category: "antiraid",
  userPermissions: [discord.PermissionFlagsBits.SendMessages],
  botPermissions: [discord.PermissionFlagsBits.SendMessages],
  run: async (client, message, args) => {

    const content = args.join(" ")
        /* Promisify the eval */
        let output = await new Promise((resolve, reject) => resolve(eval(content)));

        /* If output is not a string */
        if (typeof output !== "string") {
            /* convert it to string */
            output = require("util").inspect(output, { depth: 0 });
        }

        /* Send the output */
        message.channel.send({
            content: codeBlock('js', output)
        });
  }


}