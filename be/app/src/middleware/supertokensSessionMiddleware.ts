import Session from "supertokens-node/recipe/session";
import type { Request, Response, NextFunction } from "express";
import app from "../app.ts";

export const supertokensSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch session data using Supertokens
    const session = await Session.getSession(req, res, {
      sessionRequired: false,
    });

    // Extract session data and construct the context
    const sessionInfoFromDb = session
      ? await session.getSessionDataFromDatabase()
      : undefined;

    // Set session-related information in res.locals
    app.locals.identityId = session?.getUserId();
    app.locals.email = sessionInfoFromDb?.email;
    app.locals.sessionInfo = sessionInfoFromDb;
    app.locals.session = session;

    next();
  } catch (error) {
    if (Session.Error.isErrorFromSuperTokens(error)) {
      // return undefined; // ignore ST errors basically.
      return res.json({
        message: "There was ST error, but request handled successfully",
        context: app.locals,
      });
    }
    console.error("HI IM ERRROR FROM SUPERTOKENS CONTEXT", error);
    res.status(500).json({ error: "Server session Error" });
  }
};
