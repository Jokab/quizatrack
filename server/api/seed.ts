import { main } from "../../prisma/script";

export default defineEventHandler(async (_: any) => {
  main();
});
