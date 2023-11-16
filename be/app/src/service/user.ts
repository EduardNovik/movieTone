import { Router, Request, Response } from "express";
import { db } from "../db.ts";
import { users, identities } from "@movieTone/database-schema";
import { and, eq } from "drizzle-orm";

const router: Router = Router();

// isUserExist

router.get("/", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users);
  return !!user;
});

// isUserOnboarded

router.get("/", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const identityId = res.locals.identityId;

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .innerJoin(identities, eq(users.id, identities.userId))
    .where(eq(identities.id, identityId));

  return !!user;
});

export default router;
