import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import { users, identities } from "@movieTone/database-schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

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
    const { name, email, password } = req.body;
    console.log("INPUTED DATA", name, email, password);

    await db.transaction(async (trx) => {
      const userId = crypto.randomUUID();
      const identityId = app.locals.identityId;

      // Insert into 'users' table
      await trx.insert(users).values({
        id: userId,
        name,
        email,
        password,
      });
      // Insert into 'identities' table
      await trx.insert(identities).values({
        id: identityId,
        userId: userId,
        email,
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

  const [user] = await db
    .select()
    .from(users)
    .innerJoin(identities, eq(users.id, identities.userId))
    .where(eq(identities.id, identityId));

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

  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .innerJoin(identities, eq(users.id, identities.userId))
    .where(eq(identities.id, identityId));

  res.status(200).json({ user: user });
  console.log(user);
}

// getAllUsers
export async function getAllUsers(req: Request, res: Response) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const [user] = await db.select().from(users);
  res.status(200).end();

  return !!user;
}
