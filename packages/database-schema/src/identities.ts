import { sql } from "drizzle-orm";
import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const identities = pgTable("identities", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  email: varchar("email", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

export type IdentitySelect = typeof identities.$inferSelect;
export type IdentityInsert = typeof identities.$inferInsert;
