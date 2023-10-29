import { sql } from "drizzle-orm";
import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
