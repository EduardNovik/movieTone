import { relations } from "drizzle-orm";
import { users } from "./users";
import { watchlist } from "./watchlist";
import { usersToWatchlist } from "./users-to-watchlist";

export const usersToWatchlistRelations = relations(
  usersToWatchlist,
  ({ one }) => ({
    users: one(users, {
      fields: [usersToWatchlist.userId],
      references: [users.id],
    }),
    watchlist: one(watchlist, {
      fields: [usersToWatchlist.watchlistId],
      references: [watchlist.id],
    }),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  watchlist: many(watchlist),
  usersToWatchlist: many(usersToWatchlist),
}));

export const watchlistRelations = relations(watchlist, ({ many }) => ({
  usersToWatchlist: many(usersToWatchlist),
}));
