import { Router } from "express";
import type { Request, Response } from "express";
import app from "../app.ts";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import {
  addTitleToExistingWatchlist,
  addTitleAndCreateWatchlist,
  addWatchlist,
  getUsersWatchlist,
  deleteWatchlist,
  getTitlesInWatchlist,
} from "../handlers/watchlist.ts";

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
  getUsersWatchlist(req, res, app)
);

currentRouter.delete(
  "/deleteWatchlist",
  verifySession(),
  (req: Request, res: Response) => deleteWatchlist(req, res, app)
);

currentRouter.post("/titles", verifySession(), (req: Request, res: Response) =>
  getTitlesInWatchlist(req, res)
);

export default currentRouter;
