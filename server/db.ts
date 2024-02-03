import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

export function createDb() {
  prisma = new PrismaClient();
}
