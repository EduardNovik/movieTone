import express from "express";
import {
  userOnboard,
  isUserOnboarded,
  getUserByIdentityId,
  getAllUsers,
} from "../service/user.ts";
import app from "../app.ts";

let currentRouter = express.Router();

// getAllUsers

currentRouter.get("/all", (req, res) => getAllUsers(req, res));

// getUserByIdentityId

currentRouter.get("/current", (req, res) => getUserByIdentityId(req, res, app));

// isUserOnboarded

currentRouter.get("/onboarded", (req, res) => isUserOnboarded(req, res, app));

// userOnboard

currentRouter.post("/onboard", (req, res) => userOnboard(req, res, app));

export default currentRouter;
