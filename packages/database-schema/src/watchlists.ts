import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import { sql } from "drizzle-orm";

export const watchlists = pgTable("watchlists", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 200 }).notNull(),
  genre: varchar("genre", { length: 200 }),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

export type WatchlistsSelect = typeof watchlists.$inferSelect;
export type WatchlistsInsert = typeof watchlists.$inferInsert;
