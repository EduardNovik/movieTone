import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import { users, identities, watchlists } from "@movieTone/database-schema";
import crypto from "crypto";
import { SessionRequest } from "supertokens-node/framework/express";
import { getUserByIdentityIdService } from "../services/userService.ts";

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

// getUserSessionData----

export async function protectedContext(
  req: SessionRequest,
  res: Response,
  app: Application
) {
  // userId here must be the same as identityId
  let userId = req.session!.getUserId();
  let identityId = app.locals.identityId;
  res.json({
    userId: userId,
    identityId: identityId,
  });
}
