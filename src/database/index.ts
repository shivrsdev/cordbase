import { getDataChannel } from "../client";
import { type Message } from "discord.js";
import type { Partition } from "./partition";

const PARTITION_SIZE = 200;

function splitString(s: string, length: number) {
  const result = [];
  for (let i = 0; i < s.length; i += length) {
    result.push(s.slice(i, i + length));
  }
  return result;
}

export class Database {
  static async create(id: string, data: string) {
    const dataChannel = getDataChannel();
    const partitions = splitString(data, PARTITION_SIZE);

    for (let i = 0; i < partitions.length; i++) {
      const partition: Partition = {
        id: i + 1,
        recordId: id,
        data: partitions[i],
      };
      await dataChannel?.send(JSON.stringify(partition));
    }
  }

  static async set(id: string, value: any) {
    const dataChannel = getDataChannel();
    const messages = await dataChannel?.messages.fetch();

    // Delete existing partitions for this record
    await Promise.all(
      messages?.map(async (message: Message) => {
        const data = JSON.parse(message.content) as Partition;

        if (data.recordId === id) {
          await message.delete();
        }
      }) || []
    );

    // Split new value into partitions and save
    const partitionedData = splitString(value, PARTITION_SIZE);
    for (let i = 0; i < partitionedData.length; i++) {
      const partition: Partition = {
        id: i + 1,
        recordId: id,
        data: partitionedData[i],
      };
      await dataChannel?.send(JSON.stringify(partition));
    }
  }

  static async get(id: string) {
    const dataChannel = getDataChannel();
    const messages = await dataChannel?.messages.fetch();
    const partitions: Partition[] = [];

    messages?.forEach((message: Message) => {
      partitions.push(JSON.parse(message.content) as Partition);
    });

    const filteredPartitions = partitions.filter(
      (partition: Partition) => partition.recordId === id
    );

    if (filteredPartitions.length === 0) {
      throw new Error("No partitions with id exist (record not found)");
    }

    return {
      id: id,
      data: filteredPartitions.map((partition) => partition.data).join(""),
    };
  }

  static async delete(id: string) {
    const dataChannel = getDataChannel();
    const messages = await dataChannel?.messages.fetch();

    await Promise.all(
      messages?.map(async (message: Message) => {
        const record = JSON.parse(message.content);

        if (record.recordId === id) {
          await message.delete();
        }
      }) || []
    );
  }
}
