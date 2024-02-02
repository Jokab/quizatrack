import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// export default async () => {
//   try {
//     await prisma.$connect();
//     console.log("DB connection established.");
//   } catch (err) {
//     console.error("DB connection failed.", err);
//   }
// };
