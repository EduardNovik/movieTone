import { Router, Request, Response } from "express";
import { db } from "../db.ts";
import { users } from "@movieTone/database-schema";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users);

  return !!users;
});

export default router;
