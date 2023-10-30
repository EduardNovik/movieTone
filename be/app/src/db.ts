import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  users,
  usersRelations,
  watchlist,
  watchlistRelations,
  usersToWatchlist,
  usersToWatchlistRelations,
} from "@movieTone/database-schema";

// for query purposes
const queryClient = postgres(
  "postgresql://root:root@db-core:5432/supertokensdb"
);

export const db = drizzle(queryClient, {
  schema: {
    users,
    usersRelations,
    watchlist,
    watchlistRelations,
    usersToWatchlist,
    usersToWatchlistRelations,
  },
});
