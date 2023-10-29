import type { Config } from "drizzle-kit";

export default {
  schema: "./src/index.ts",
  driver: "pg",
  out: "./drizzle",
  breakpoints: true,
  dbCredentials: {
    connectionString: "postgresql://root:root@localhost:5432/movietonedb",
  },
} satisfies Config;
