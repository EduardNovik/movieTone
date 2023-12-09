import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { watchlists } from "./watchlists.ts";
import { titles } from "./titles.ts";

export const titlesToWatchlists = pgTable(
  "titlesToWatchlists",
  {
    titleId: uuid("titleId")
      .notNull()
      .references(() => titles.id),
    watchlistId: uuid("watchlistId")
      .notNull()
      .references(() => watchlists.id),
  },
  (t) => ({
    pk: primaryKey(t.titleId, t.watchlistId),
  })
);

export type TitlesToWatchlistsSelect = typeof titlesToWatchlists.$inferSelect;
export type TitlesToWatchlistsInsert = typeof titlesToWatchlists.$inferInsert;
