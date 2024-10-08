import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import { users, identities } from "@movieTone/database-schema";
import crypto from "crypto";
import { SessionRequest } from "supertokens-node/framework/express";
import { getUserByIdentityIdService } from "../services/userService.ts";
import { eq } from "drizzle-orm";

// userOnboard----
export async function userOnboard(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  console.log("THIS IS REGISTRATION");

  try {
    // const email = app.locals.email;
    const { name, email, password } = req.body;
    console.log("THIS IS ALL DATA", name, email, password);

    console.log("UserOnboard PASSED DATA ", name, email, password);
    const userId = crypto.randomUUID();
    const identityId = app.locals.identityId;

    console.log("userId PASSED DATA ", userId);

    console.log("identityId PASSED DATA ", identityId);

    await db.transaction(async (trx) => {
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
  } catch (error: any) {
    console.log("HEY WE ARE IN CATCH");
    console.log(error);
    res.status(400).json({ error: error });
  }
}

// isUserOnboarded----
// its fit when you already logged in and have a session, so then you can retrieve identityId
// I haven't use it yet
export async function isUserOnboarded(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const identityId = app.locals.identityId;
    if (!identityId) {
      throw new Error("identityId is undefined");
    }
    const user = await getUserByIdentityIdService(identityId);
    res.status(200).json({ onboarded: !!user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
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

// isUserRegistered----

export async function isUserRegistered(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const email = req.body.email;
  console.log("AAAAAAAAAAAAAAAAAAAAAAAA", email);

  try {
    const user = await db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(eq(users.email, email));
    return res.status(200).json({ registered: !!user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}
