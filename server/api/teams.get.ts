import { prisma } from "@/server/db";

export default defineEventHandler(async () => {
  const teams = await prisma.team.findMany();
  console.log(teams)
  return teams;
});
