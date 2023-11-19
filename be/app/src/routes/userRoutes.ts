import express from "express";
import {
  userOnboard,
  isUserOnboarded,
  getCurrentUser,
  getAllUsers,
  isUserOnboarded2,
} from "../service/user.ts";
import app from "../app.ts";

let currentRouter = express.Router();

// getAllUsers

currentRouter.get("/all", (req, res) => getAllUsers(req, res));

// getCurrentUser

currentRouter.get("/current", (req, res) => getCurrentUser(req, res));

// isUserOnboarded

currentRouter.get("/onboarded", (req, res) => isUserOnboarded(req, res));

// isUserOnboarded2

currentRouter.get("/onboarded2", (req, res) => isUserOnboarded2(req, res));

// userOnboard

currentRouter.post("/onboard", (req, res) => userOnboard(req, res, app));

export default currentRouter;
