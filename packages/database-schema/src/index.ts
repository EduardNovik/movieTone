export type { UserInsert, UserSelect } from "./users.ts";
export type { IdentityInsert, IdentitySelect } from "./identities.ts";
export type { WatchlistsInsert, WatchlistsSelect } from "./watchlists.ts";
export type { TitlesInsert, TitlesSelect } from "./titles.ts";
export type {
  TitlesToWatchlistsInsert,
  TitlesToWatchlistsSelect,
} from "./titles-to-watchlist.ts";

export { users } from "./users.ts";
export { watchlists } from "./watchlists.ts";
export { titles } from "./titles.ts";
export { titlesToWatchlists } from "./titles-to-watchlist.ts";
export { identities } from "./identities.ts";
export {
  usersRelations,
  identitiesRelations,
  watchlistsRelations,
  titlesRelations,
  titlesToWatchlistsRelations,
} from "./relations.ts";
