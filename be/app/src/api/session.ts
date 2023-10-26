import { Request, Response, Router } from "express";
import serverAuth from "../libs/serverAuth";

const router = Router();

export default router.post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    return res.status(200).json({ session: currentUser });

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Not signed in" });
  }
});
