import { Router } from "express";
import type { Request, Response } from "express";
import app from "src/app.ts";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import { addToWatchlist } from "../service/watchlist.ts";

let currentRouter = Router();

currentRouter.post("/add", verifySession(), (req: Request, res: Response) =>
  addToWatchlist(req, res, app)
);

export default currentRouter;
