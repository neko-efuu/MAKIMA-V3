const fs = require("fs-extra");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "Efat",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands",
    },
    longDescription: {
      en: "View detailed command usage and see the full list of commands available.",
    },
    category: "info",
    guide: {
      en: "{pn} - help [command name]",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);
    const threadData = await threadsData.get(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭───────❁";
      msg += `\n│ 𝗘𝗙𝗔𝗧 𝗛𝗘𝗟𝗣 𝗠𝗘𝗡𝗨\n╰────────────❁`;

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;
        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『 ${category.toUpperCase()} 』`;
          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map(item => `⭔${item}`);
            msg += `\n│ ${cmds.join("   ")}`;
          }
          msg += `\n╰────────────✰`;
        }
      });

      msg += `\n\n╭─────✰[INFO]
│ > TOTAL COMMANDS: ${commands.size}
│ > TYPE: ${prefix}help [command]
╰────────────✰`;

      msg += `\n╭─────✰\n│ Powered by: 𝗘𝗙𝗔𝗧\n╰────────────✰`;

      const imageUrl = "https://i.ibb.co/VwJkHhX/efat-help.jpg"; // safe image hosting

      let attachment = null;
      try {
        attachment = await global.utils.getStreamFromURL(imageUrl);
      } catch (e) {
        console.error("Image fetch error:", e.message);
      }

      return message.reply({ body: msg, attachment });
    }

    // Specific command info
    const commandName = args[0].toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));

    if (!command) {
      return message.reply(`Command "${commandName}" not found.`);
    }

    const config = command.config;
    const roleText = roleTextToString(config.role);
    const author = config.author || "Unknown";
    const description = config.longDescription?.en || "No description available.";
    const usage = config.guide?.en?.replace(/{p}/g, prefix).replace(/{n}/g, config.name) || "No usage guide.";

    const replyMsg = `
╭───⊙
│ 🔶 ${config.name}
├── INFO
│ 📝 Description: ${description}
│ 👤 Author: ${author}
│ ⚙ Guide: ${usage}
├── USAGE
│ 🔯 Version: ${config.version || "1.0"}
│ ♻ Role: ${roleText}
╰────────────⊙`;

    return message.reply(replyMsg);
  },
};

function roleTextToString(role) {
  switch (role) {
    case 0: return "0 (All users)";
    case 1: return "1 (Group admins)";
    case 2: return "2 (Bot admins)";
    default: return "Unknown";
  }
}      msg += `\n│𝗔𝗬𝗔𝗡 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧\n╰────────────❁`; 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✰`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n╭─────✰[𝗘𝗡𝗝𝗢𝗬]\n│>𝗧𝗢𝗧𝗔𝗟 𝗖𝗠𝗗𝗦: [${totalCommands}].\n│𝗧𝗬𝗣𝗘𝖳:[ ${prefix}𝗛𝗘𝗟𝗣 \n│.]\n╰────────────✰`;
      msg += ``;
      msg += `\n╭─────✰\n│ ╣[𝗔  𝗬 𝗔 𝗡]╠\n╰────────────✰`; 

const helpListImages = [ "https://i.imgur.com/a3JShJK.jpeg" ];


      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `
  ╭───⊙
  │ 🔶 ${configCommand.name}
  ├── INFO
  │ 📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${longDescription}
  │ 👑 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  │ ⚙ 𝗚𝘂𝗶𝗱𝗲: ${usage}
  ├── USAGE
  │ 🔯 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}
  │ ♻𝗥𝗼𝗹𝗲: ${roleText}
  ╰────────────⊙`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
