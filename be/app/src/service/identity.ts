import { Router, Request, Response } from "express";
import { db } from "../db.ts";
import crypto from "crypto";
import {
  users,
  watchlist,
  usersToWatchlist,
  identities,
} from "@movieTone/database-schema";
import { uuid } from "drizzle-orm/pg-core";

let router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await db.insert(identities).values({
      id: res.locals.identityId,
      userId: crypto.randomUUID(),
      email: res.locals.email,
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export default router;
