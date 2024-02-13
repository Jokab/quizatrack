import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/no-mutable-exports
export let prisma: PrismaClient;

export function createDb() {
  prisma = new PrismaClient();
}
