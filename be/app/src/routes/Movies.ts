import express, { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ data: "Here is you movie data" });
});

export default router;
