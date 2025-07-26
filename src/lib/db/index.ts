import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../../schema.js";
import { readConfig } from "../../config";

const config = await readConfig();
if (!config) {
  process.exit(0)
}
const conn = postgres(config.dbUrl);
export const db = drizzle(conn, { schema });
