import { Router } from "express";
import type { Request, Response } from "express";
import app from "../app.ts";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import {
  addTitleToExistingWatchlist,
  addTitleAndCreateWatchlist,
  addWatchlist,
  getUsersWatchlists,
} from "../service/watchlist.ts";

let currentRouter = Router();

currentRouter.post(
  "/addTitle",
  verifySession(),
  (req: Request, res: Response) => addTitleToExistingWatchlist(req, res)
);

currentRouter.post(
  "/addTitleAndWatchlist",
  verifySession(),
  (req: Request, res: Response) => addTitleAndCreateWatchlist(req, res, app)
);

currentRouter.post(
  "/addWatchlist",
  verifySession(),
  (req: Request, res: Response) => addWatchlist(req, res, app)
);

currentRouter.get("/all", verifySession(), (req: Request, res: Response) =>
  getUsersWatchlists(req, res, app)
);

export default currentRouter;
