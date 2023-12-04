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
import { watchlist } from "./watchlist.ts";
import { usersToWatchlist } from "./users-to-watchlist.ts";
import { identities } from "./identities.ts";

// we need one to many

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

export const identitiesRelation = relations(identities, ({ one }) => ({
  users: one(users, {
    fields: [identities.userId],
    references: [users.id],
  }),
}));

// user has many relation with title(watchlist) and user has many relation with userToWatchlist
// user has one relation with identities
export const usersRelations = relations(users, ({ one, many }) => ({
  identities: one(identities, {
    fields: [users.id],
    references: [identities.userId],
  }),
  watchlist: many(watchlist),
  usersToWatchlist: many(usersToWatchlist),
}));

// =======
// we need one to many

// indicates that each title(watchlist) can have one user

// each watchlist has {one} user
// one because each title can have one user
export const watchlistRelations = relations(watchlist, ({ one }) => ({
  users: one(users, {
    fields: [watchlist.userId],
    references: [users.id],
  }),
}));
