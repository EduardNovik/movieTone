// import bycrypt from "bcrypt";
// import { Request, Response } from "express";
// import { Router } from "express";
// import prisma from "../libs/prismadb";

// const router = Router()
// export default async function handler(req: Request, res: Response) {
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }

//   try {
//     const { email, username, name, password } = req.body;
//     const hashedPassword = await bycrypt.hash(password, 12);

//     const user = await prisma.user.create({
//       data: {
//         email,
//         username,
//         name,
//         hashedPassword,
//       },
//     });

//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }

import bycrypt from "bcrypt";
import { Request, Response } from "express";
import { Router } from "express";
import prisma from "../libs/prismadb";

const router = Router();

export default router.post("/", async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;
    const hashedPassword = await bycrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});
