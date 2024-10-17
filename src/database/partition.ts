// /src/database/partition.ts
// Partition - Send messages in chunks

export interface Partition {
  id: number;
  recordId: string;
  data: string;
}
