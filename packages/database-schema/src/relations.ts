// import { relations } from "drizzle-orm";
// import { users } from "./users.ts";
// import { watchlist } from "./watchlist.ts";
// import { usersToWatchlist } from "./users-to-watchlist.ts";
// import { identities } from "./identities.ts";

// export const usersToWatchlistRelations = relations(
//   usersToWatchlist,
//   ({ one }) => ({
//     users: one(users, {
//       fields: [usersToWatchlist.userId],
//       references: [users.id],
//     }),
//     watchlist: one(watchlist, {
//       fields: [usersToWatchlist.watchlistId],
//       references: [watchlist.id],
//     }),
//   })
// );

// export const identitiesRelation = relations(identities, ({ one }) => ({
//   users: one(users, {
//     fields: [identities.userId],
//     references: [users.id],
//   }),
// }));

// export const usersRelations = relations(users, ({ many }) => ({
//   watchlist: many(watchlist),
//   usersToWatchlist: many(usersToWatchlist),
// }));

// export const watchlistRelations = relations(watchlist, ({ many }) => ({
//   usersToWatchlist: many(usersToWatchlist),
// }));

// --------------------------------------------

import { relations } from "drizzle-orm";
import { users } from "./users.ts";
import { titles } from "./titles.ts";
import { watchlists } from "./watchlists.ts";
import { titlesToWatchlists } from "./titles-to-watchlist.ts";
import { identities } from "./identities.ts";

// user has one relation with identities and one to many with watchlists
export const usersRelations = relations(users, ({ one, many }) => ({
  identities: one(identities, {
    fields: [users.id],
    references: [identities.userId],
  }),
  watchlists: many(watchlists),
}));

export const identitiesRelations = relations(identities, ({ one }) => ({
  users: one(users, {
    fields: [identities.userId],
    references: [users.id],
  }),
}));

export const watchlistsRelations = relations(watchlists, ({ one, many }) => ({
  users: one(users, {
    fields: [watchlists.id],
    references: [users.id],
  }),
  titlesToWatchlists: many(titlesToWatchlists),
}));

export const titlesRelations = relations(watchlists, ({ many }) => ({
  titlesToWatchlists: many(titlesToWatchlists),
}));

export const titlesToWatchlistsRelations = relations(
  titlesToWatchlists,
  ({ many }) => ({
    titles: many(titles),
    watchlists: many(watchlists),
  })
);

// =======
// we need one to many
// indicates that each watchlist can have one user
