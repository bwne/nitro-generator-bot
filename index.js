require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// CHANNED IDS
const GIFT_CHANNEL_ID = "ENTER_YOUR_GIFT_CHANNEL_ID";
const PROMO_CHANNEL_ID = "ENTER_YOUR_PROMO_CODE_ID";

// IF YOU WANT MORE BOTS CHANGE lenght: 15 AND ADD TOKENS TO .env
const TOKENS = Array.from({ length: 15 }, (_, i) => process.env[`TOKEN${i + 1}`]);

//  RANDOM STRINGS
function randomString(len) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

// GIFT LOOP
async function loopGift(client, index) {
  while (true) {
    try {
      const channel = client.channels.cache.get(GIFT_CHANNEL_ID);
      if (channel) {
        const len = Math.floor(Math.random() * 10) + 15;
        const code = randomString(len);

        await channel.send(`https://discord.gift/${code}`);
        console.log(`🎁 Bot ${index} sent a gift`);
      }
    } catch {}

    await new Promise(r => setTimeout(r, 2000));
  }
}

// 🎟️ PROMO CODES RANDOM LOOP
async function loopPromo(client, index) {
  while (true) {
    try {
      const channel = client.channels.cache.get(PROMO_CHANNEL_ID);
      if (channel) {
        const len = Math.floor(Math.random() * 10) + 15;
        const code = randomString(len);

        await channel.send(`https://promos.discord.gg/${code}`);
        console.log(`🎟️ Bot ${index} sent promo code`);
      }
    } catch {}

    await new Promise(r => setTimeout(r, 2000));
  }
}

// STARTING THE BOT
function createBot(token, index) {
  if (!token) {
    console.log(` TOKEN${index} add token `);
    return;
  }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  client.once("clientReady", () => {
    console.log(` Bot ${index} is ready: ${client.user.tag}`);

    loopGift(client, index);
    loopPromo(client, index);
  });

  client.login(token).catch(err => {
    console.log(` Bot ${index} login error:`, err.message);
  });
}

// START ALL
TOKENS.forEach((t, i) => {
  createBot(t, i + 1);
});
