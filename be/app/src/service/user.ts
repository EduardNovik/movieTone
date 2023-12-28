import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import { users, identities, watchlists } from "@movieTone/database-schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

// getUserByIdentityIdService
export async function getUserByIdentityIdService(identityId: string) {
  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .innerJoin(identities, eq(users.id, identities.userId))
    .where(eq(identities.id, identityId));

  return user;
}

// getUserWatchlistsdService
export async function getUserWatchlistsService(identityId: string) {
  const usersWatchlists = await db
    .select({ watchlistId: watchlists.id, userId: watchlists.userId })
    .from(watchlists)
    .where(eq(watchlists.userId, identityId));

  return usersWatchlists;
}

// userOnboard----
export async function userOnboard(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const email = app.locals.email;
    const { name, password } = req.body;

    console.log("PASSED DATA", name, email, password);

    await db.transaction(async (trx) => {
      const userId = crypto.randomUUID();
      const identityId = app.locals.identityId;

      // Insert into 'users' table
      await trx.insert(users).values({
        id: userId,
        name,
        email: email,
        password,
      });
      // Insert into 'identities' table
      await trx.insert(identities).values({
        id: identityId,
        userId: userId,
        email: email,
      });
    });

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// isUserOnboarded----
export async function isUserOnboarded(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const identityId = app.locals.identityId;
  const user = await getUserByIdentityIdService(identityId);

  res.status(200).json({ onboarded: !!user });
}

// getUserByIdentityId----
export async function getUserByIdentityId(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const identityId = app.locals.identityId;
  const user = await getUserByIdentityIdService(identityId);

  res.status(200).json({ user: user });
  console.log(user);
  return user;
}
