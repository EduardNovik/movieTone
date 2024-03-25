import { Router } from "express";
import { addIdentity } from "../handlers/identity.ts";

let currentRouter: Router = Router();

// addIdentities
currentRouter.post("/", (req, res) => {
  addIdentity(req, res);
});

export default currentRouter;
