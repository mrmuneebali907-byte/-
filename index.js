const login = require("facebook-chat-api");
const fs = require("fs");
const moment = require("moment");

const appState = JSON.parse(
  fs.readFileSync("appstate.json", "utf8")
);

login({ appState }, (err, api) => {
  if (err) return console.error(err);

  console.log("🤖 Bot Logged In");

  api.listenMqtt((err, message) => {
    if (err) return;
    if (!message.body) return;

    const msg = message.body.toLowerCase();
    const thread = message.threadID;

    if (msg === "hi" || msg === "hello") {
      api.sendMessage("👋 Hello! Main Cookie Bot hoon 🤖", thread);
    }

    if (msg === "!time") {
      api.sendMessage(
        "🕒 Time: " + moment().format("hh:mm A"),
        thread
      );
    }

    if (msg === "!help") {
      api.sendMessage(
        "📌 Commands:\n!help\n!time\n!ai <text>",
        thread
      );
    }

    if (msg.startsWith("!ai ")) {
      api.sendMessage("🤔 Soch raha hoon...", thread);
    }
  });
});
