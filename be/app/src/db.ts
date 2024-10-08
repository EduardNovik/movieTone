import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  users,
  identities,
  identitiesRelations,
  usersRelations,
  watchlists,
  watchlistsRelations,
  titles,
  titlesRelations,
  titlesToWatchlists,
  titlesToWatchlistsRelations,
} from "@movieTone/database-schema";

// for query purposes
const queryClient = postgres(process.env.DB_URL!);

export const db = drizzle(queryClient, {
  schema: {
    users,
    usersRelations,
    identities,
    identitiesRelations,
    watchlists,
    watchlistsRelations,
    titles,
    titlesRelations,
    titlesToWatchlists,
    titlesToWatchlistsRelations,
  },
});
