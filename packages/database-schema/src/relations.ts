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

// we define many to many relation by deviding relation into 2 steps: one to many (title, will be with many)
// and one to many (watchlists, will be with many) and  we will get : t < [titlesToWatchlists] > w
// titlesToWatchlists will be with one,  so that will be many to many with joining table titlesToWatchlists

export const titlesToWatchlistsRelations = relations(
  titlesToWatchlists,
  ({ one }) => ({
    titles: one(titles, {
      fields: [titlesToWatchlists.titleId],
      references: [titles.id],
    }),
    watchlists: one(watchlists, {
      fields: [titlesToWatchlists.watchlistId],
      references: [watchlists.id],
    }),
  })
);
