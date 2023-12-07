import { Router } from "express";
import type { Request, Response } from "express";
import app from "../app.ts";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import { addTitleToWatchlist } from "../service/watchlist.ts";

let currentRouter = Router();

currentRouter.post("/add", verifySession(), (req: Request, res: Response) =>
  addTitleToWatchlist(req, res, app)
);

export default currentRouter;
