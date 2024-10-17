// /src/index.ts
// Entry point to cordbase server

import Elysia from "elysia";
import { client } from "./client";
import swagger from "@elysiajs/swagger";
import { handler } from "./handler";

client.on("ready", async () => {
  const app = new Elysia()
    .use(swagger())
    .use(handler)
    .listen(Bun.env.PORT ?? 3000);

  console.log(
    `
cordbase serving at ${app.server?.hostname}:${app.server?.port}
logged in as ${client.user?.tag}
data channel: ${Bun.env.DISCORD_DATA_CHANNEL}
    `
  );
});

client.login(Bun.env.TOKEN);
