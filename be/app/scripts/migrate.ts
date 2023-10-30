import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as console from "node:console";
import postgres from "postgres";
import * as z from "zod";

const stringSchema = z.string();

const dbURL = stringSchema.parse(process.env.DB_URL);
const migrationConnection = postgres(dbURL, {
  max: 1,
  onnotice: () => {},
});
const connection = drizzle(migrationConnection);

void migrate(connection, {
  migrationsFolder: "./node_modules/@movieTone/database-schema/drizzle",
})
  .then(() => {
    console.info("Migration complete");
  })
  .catch((error) => {
    console.error("Migration failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await migrationConnection.end();
    console.info("Connection closed");
    process.exit(0);
  });
