import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const titles = pgTable("titles", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  img: varchar("img").notNull(),
  imdb: varchar("imdb", { length: 20 }),
  year: integer("year"),
  description: varchar("description"),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

export type TitlesSelect = typeof titles.$inferSelect;
export type TitlesInsert = typeof titles.$inferInsert;

// userId +
