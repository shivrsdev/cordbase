# cordbase

> ### Warning, I do not endorse stealing storage from companies for yourself, this is just an educational implementation to show that it is possible to make an entire database with discord's messaging system.

## What is this?
This project is a database which uses discord's messaging system, the database stores all it's data in partitions allowing the program to evade the discord message limit, I of course do not endorse stealing companies' storage for yourself, this is just a fun educational implementation.
Currently this is a key-store database but it can example to much higher horizons with it's engine.

## Installation
First change the ```.env-example``` file to ```.env```, then inside it add the ```DISCORD_TOKEN``` and ```DISCORD_DATA_CHANNEL```, the ```DISCORD_DATA_CHANNEL``` is the id of the channel where all the data will be stored.
You can create a bot in the discord portal: [Discord portal](https://discord.com/developers/docs/intro)

To install dependencies:
```bash
bun install
```
To run:
```bash
bun run src/index.ts
```

## Usage
Currently you can only access this through curl, but when running the program you can go to ```localhost:3000/swagger``` to see the server routes, you can easily create a client with this due to it being just a key-store database and only having 4 routes.