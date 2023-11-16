export type { UserInsert, UserSelect } from "./users.ts";
export type { IdentityInsert, IdentitySelect } from "./identities.ts";
export type { WatchlistInsert, WatchlistSelect } from "./watchlist.ts";
export type {
  UsersToWatchlistSelect,
  UsersToWatchlistInsert,
} from "./users-to-watchlist.ts";

export { users } from "./users.ts";
export { watchlist } from "./watchlist.ts";
export { usersToWatchlist } from "./users-to-watchlist.ts";
export { identities } from "./identities.ts";
export {
  usersRelations,
  watchlistRelations,
  usersToWatchlistRelations,
  identitiesRelation,
} from "./relations.ts";
