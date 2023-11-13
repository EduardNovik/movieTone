import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as console from "node:console";
import postgres from "postgres";

const migrationConnection = postgres(
  "postgresql://root:root@localhost:5433/movietonedb",
  {
    max: 1,
    onnotice: () => {},
  }
);

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
