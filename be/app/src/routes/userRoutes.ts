import express, { Router, Request, Response } from "express";
import { db } from "../db.ts";
import { users, identities } from "@movieTone/database-schema";
import { and, eq } from "drizzle-orm";
import app from "../app.ts";

let currentRouter = express.Router();

// getAllUsers

currentRouter.get("/all", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const [user] = await db.select().from(users);
  res.status(200).end();

  return !!user;
});

// getCurrentUser

currentRouter.get("/current", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, res.locals.identityId));
  res.status(200).end();

  return user;
});

// isUserOnboarded

currentRouter.get("/onboarded", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const identityId = res.locals.identityId;

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .innerJoin(identities, eq(users.id, identities.userId))
    .where(eq(identities.id, identityId));
  res.status(200).end();

  return !!user;
});

// isUserOnboarded2

currentRouter.get("/onboarded2", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, res.locals.identityId));
  res.status(200).end();

  return !!user;
});

// userOnboard

currentRouter.post("/onboard", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // const userId = crypto.randomUUID(),

    await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    });

    await db.insert(identities).values({
      id: app.locals.identityId,
      userId: crypto.randomUUID(),
      email,
    });

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export default currentRouter;
