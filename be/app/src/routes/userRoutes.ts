import { Router } from "express";

import {
  userOnboard,
  isUserOnboarded,
  getUserByIdentityId,
  isUserRegistered,
} from "../handlers/user.ts";
import app from "../app.ts";

let currentRouter = Router();

// getUserByIdentityId

currentRouter.get("/current", (req, res) => getUserByIdentityId(req, res, app));

// isUserOnboarded

currentRouter.get("/onboarded", (req, res) => isUserOnboarded(req, res, app));

// userOnboard

currentRouter.post("/onboard", (req, res) => userOnboard(req, res, app));

// isUserRegistered

currentRouter.post("/registered", (req, res) => isUserRegistered(req, res));

export default currentRouter;
