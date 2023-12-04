import { sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

import { users } from "./users.ts";


export const watchlist = pgTable("watchlist", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  titleId: integer("titleId"),
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

export type WatchlistSelect = typeof watchlist.$inferSelect;
export type WatchlistInsert = typeof watchlist.$inferInsert;


userId + 