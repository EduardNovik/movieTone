import express, { Router, Request, Response } from "express";
import { db } from "../db.ts";
import crypto from "crypto";
import { users } from "@movieTone/database-schema";

let currentRouter: Router = express.Router();

currentRouter.post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

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

export default currentRouter;
