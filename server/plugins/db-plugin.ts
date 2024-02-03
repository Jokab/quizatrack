import { createDb } from "../db";

export default defineNitroPlugin((_) => {
  createDb();
});
