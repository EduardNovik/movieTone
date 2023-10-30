import { Router, Request, Response } from "express";
import { db } from "../db";
import crypto from "crypto";
import { users } from "@movieTone/database-schema";

let router: any = Router();

Router().post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;

    return await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        name,
        email,
        password,
      })
      .returning();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export default router;
