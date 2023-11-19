import { Application, Request, Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";

// Check context route
export async function checkContext(
  req: Request,
  res: Response,
  app: Application
) {
  const { identityId, email, sessionInfo } = app.locals;

  res.json({
    context: "HEY THIS IS YOUR CONTEXT BIAAATCH!!!",
    identityId: identityId,
    email: email,
    sessionInfo: sessionInfo,
  });
}

export async function protectedContext(
  req: SessionRequest,
  res: Response,
  app: Application
) {
  let userId = req.session!.getUserId();
  let identityId = app.locals.identityId;
  res.json({
    userId: userId,
    identityId: identityId,
  });
}
