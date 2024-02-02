import prisma from "~/plugins/db.ts";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  return `${id} är toppen`;
});
