import { Request, Response, Router } from "express";
import serverAuth from "../libs/serverAuth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export default router;

// version without Router

// import { Request, Response } from "express";
// import serverAuth from "../libs/serverAuth";

// export default async function handler(req: Request, res: Response) {
//   if (req.method !== "GET") {
//     return res.status(405).end();
//   }

//   try {
//     const { currentUser } = await serverAuth(req);

//     return res.status(200).json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }
