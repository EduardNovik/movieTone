import express, { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/shcema.ts";
import registrationRoute from "./service/registration.ts";

const app = express();
const yoga = createYoga({ schema });
const port = process.env.PORT || 4000;

supertokens.init({
  framework: "express",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "http://localhost:3568",
    apiKey: "core-secret-key-supertokensdb",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "movietonebe",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/",
  },
  recipeList: [
    Passwordless.init({
      flowType: "MAGIC_LINK",
      contactMethod: "EMAIL",
    }),
    Session.init(), // initializes session features
  ],
});

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(express.json());
app.use("/graphql", yoga);

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify("ROOT OF THE SERVER"));
});

app.get("/api", (req: Request, res: Response) => {
  res.send(JSON.stringify("ZALUPKA"));
});

// your own error handler
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     // TODO
// });

app.use(errorHandler());

const handleSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let session = await Session.getSession(req, res, {
      sessionRequired: false,
    });

    res.locals.sessionData = {
      userId: session !== undefined ? session.getUserId() : undefined,
    };

    next();
  } catch (err) {
    if (Session.Error.isErrorFromSuperTokens(err)) {
      res
        .status(err.type === Session.Error.INVALID_CLAIMS ? 403 : 401)
        .send("Session related error");
    } else {
      next(err);
    }
  }
};

app.use(express.json());
app.use(handleSession);

// Routes-----------
app.use("/registration", registrationRoute);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
