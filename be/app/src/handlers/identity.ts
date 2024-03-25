import { Request, Response } from "express";
import { db } from "../db.ts";
import crypto from "crypto";
import { identities, users } from "@movieTone/database-schema";

export async function addIdentity(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const userId = crypto.randomUUID();
    await db.insert(users).values({
      id: userId,
      name: "TEST",
      email: "hui@fs.com",
      password: "TEST PASSWORD",
    });
    await db.insert(identities).values({
      id: crypto.randomUUID(),
      userId: userId,
      email: "hui@fs.com",
    });

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
