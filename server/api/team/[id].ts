import { prisma } from "../../db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log(id, Number(id));
  const team = await prisma.team.findFirst({ where: { id: Number(id) } });
  console.log(team);
  return `${team?.name} är toppen`;
});
