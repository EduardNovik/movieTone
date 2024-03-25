import { db } from "../db.ts";
import { eq } from "drizzle-orm";
import { watchlists, users, identities } from "@movieTone/database-schema";

// getUserByIdentityIdService
export async function getUserByIdentityIdService(identityId: string) {
  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .innerJoin(identities, eq(users.id, identities.userId))
    .where(eq(identities.id, identityId));

  return user;
}

// getUsersWatchlistsdService
export async function getUsersWatchlistsService(identityId: string) {
  const { id: userId } = await getUserByIdentityIdService(identityId);
  const usersWatchlists = await db
    .select({
      watchlistId: watchlists.id,
      userId: watchlists.userId,
      watchlistGenre: watchlists.genre,
      watchlistName: watchlists.name,
    })
    .from(watchlists)
    .where(eq(watchlists.userId, userId));

  return usersWatchlists;
}
