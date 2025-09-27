module.exports = {
  config: {
    name: "uptime",
    aliases: ["up", "upt"],
    version: "1.2",
    author: "efat",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },

  onStart: async function ({ api, event }) {
    const uptime = process.uptime(); // seconds

    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / 3600) % 24);
    const days = Math.floor(uptime / 86400);

    const statusMessage = `✧──────〔 BOT STATUS 〕─────✧

💠 ʜᴇʟʟᴏ ᴍᴇɪsᴛᴇʀ!
ʙᴏᴛ ᴜᴘᴛɪᴍᴇ:

📅 Days   : ${days} ᴅ
⏱️ Hours  : ${hours} ʜ
⏳ Minutes: ${minutes} ᴍ
⏰ Seconds: ${seconds} s

✅ Status  : ONLINE

✧──────────────────────✧`;

    api.sendMessage(statusMessage, event.threadID);
  }
};
