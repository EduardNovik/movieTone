import { Router } from "express";
import { addIdentity } from "../service/identity.ts";

let currentRouter: Router = Router();

// addIdentities
currentRouter.post("/", (req, res) => {
  addIdentity(req, res);
});

export default currentRouter;
