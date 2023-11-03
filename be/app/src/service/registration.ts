import { Router, Request, Response } from "express";
import { db } from "../db.ts";
import crypto from "crypto";
import { users, watchlist, usersToWatchlist } from "@movieTone/database-schema";

let router: any = Router();

router.post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // const selu = async () => await db.select().from(users)
    // const [selw] = await db.select().from(usersToWatchlist);

    await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export default router;
