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
  process.env.DB_URL!
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
