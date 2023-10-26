import { Request, Response, Router } from "express";
import { signIn } from "next-auth/react";

const router = Router();

export default router.post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, password } = req.body;

    await signIn("credentials", { email, password });

    return res.status(200).json({ message: "Authentication successful" });
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Authentication failed" }).end();
  }
});

// With this code, NextAuth.js will run its authentication logic automatically
// when you call await signIn('credentials', { email, password }).
// There's no need for an explicit call to nextAuth() in your login route.
