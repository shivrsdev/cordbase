// /src/client.ts
// Discord client

import { Client, GatewayIntentBits, TextChannel } from "discord.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

export const getDataChannel = () => {
  if (!Bun.env.DISCORD_DATA_CHANNEL) {
    console.error(
      "data channel is undefined, define it in .env (should be any sort of channel id where you want to put data)"
    );
    return;
  }

  return client.channels.cache.get(Bun.env.DISCORD_DATA_CHANNEL) as TextChannel;
};
