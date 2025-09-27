module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "Efat 🖤",
    countDown: 5,
    role: 2,
    shortDescription: { vi: "", en: "" },
    longDescription: { vi: "", en: "" },
    category: "Efat"
  },

  langs: {
    en: {
      invalidNumber: "%1 is not a valid number",
      cancelSuccess: "Refused %1 thread(s)!",
      approveSuccess: "Approved successfully %1 thread(s)!",
      cantGetPendingList: "Can't get the pending list!",
      returnListPending: "»「PENDING」«❮ The total number of threads to approve is: %1 ❯\n\n%2",
      returnListClean: "「PENDING」There is no thread in the pending list"
    }
  },

  onReply: async function({ api, event, Reply, getLang }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    let count = 0;

    // cancel option
    if (isNaN(body) && (body.indexOf("c") == 0 || body.indexOf("cancel") == 0)) {
      const index = body.slice(1).trim().split(/\s+/);
      for (const ArYanIndex of index) {
        if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) 
          return api.sendMessage(getLang("invalidNumber", ArYanIndex), threadID, messageID);

        api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[ArYanIndex - 1].threadID);
        count++;
      }
      return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    } 
    else {
      // approve option
      const index = body.split(/\s+/);
      for (const ArYanIndex of index) {
        if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) 
          return api.sendMessage(getLang("invalidNumber", ArYanIndex), threadID, messageID);

        api.sendMessage(
`✦━━━━━━━━━━━━✦
   🤖 BOT CONNECTED 🤖
✦━━━━━━━━━━━━✦

⚡ Global Prefix :! 
💬 Group Prefix  :! 

━━━━━━━━━━━━━━━
👑 Owner : 𝐄𝐟𝐚𝐭
🌐 FB    : Efats Voice
━━━━━━━━━━━━━━━

✨ Your group is now connected successfully! ✨`,
          Reply.pending[ArYanIndex - 1].threadID
        );
        count++;
      }
      return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
  },

  onStart: async function({ api, event, getLang, commandName }) {
    const { threadID, messageID } = event;
    let msg = "", index = 1;

    try {
      var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
      var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) {
      return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID);
    }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const ArYan of list) msg += `${index++}/ ${ArYan.name} (${ArYan.threadID})\n`;

    if (list.length !== 0) {
      return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID,
          pending: list
        });
      }, messageID);
    } 
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
  }
};
