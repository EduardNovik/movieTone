import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { watchlist } from "./watchlist";

export const usersToWatchlist = pgTable(
  "usersToWatchlist",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
    watchlistId: uuid("watchlistId")
      .notNull()
      .references(() => watchlist.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.watchlistId),
  })
);

export type UsersToWatchlistSelect = typeof usersToWatchlist.$inferSelect;
export type UsersToWatchlistInsert = typeof usersToWatchlist.$inferInsert;
