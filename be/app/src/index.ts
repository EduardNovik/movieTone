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
import Dashboard from "supertokens-node/recipe/dashboard/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { supertokensSessionMiddleware } from "./middleware/supertokensSessionMiddleware.ts";

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
    Session.init({
      // override: {
      //   functions: (originalImplementation) => {
      //     return {
      //       ...originalImplementation,
      //       createNewSession: async function (input) {
      //         const existingSessions =
      //           await Session.getAllSessionHandlesForUser(input.userId);
      //         console.log(existingSessions);
      //         console.log("USERID>>>>>>>>>>>>>>>>>>>>", input.userId);
      //         if (existingSessions.length > 0) {
      //           // this means that the user already has a session on some other device
      //           throw new Error("Session already exists on another device");
      //         }
      //         // no other session exists, and so we can continue with logging in this user
      //         return originalImplementation.createNewSession(input);
      //       },
      //     };
      //   },
      // },
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            async createNewSession(input) {
              const user = await supertokens.getUser(input.userId);
              input.sessionDataInDatabase = user?.loginMethods.find(
                (it) => it.recipeId === "passwordless"
              )
                ? {
                    type: "passwordless",
                    email: user.emails[0],
                  }
                : {};
              return originalImplementation.createNewSession(input);
            },
          };
        },
      },
    }), // initializes session features
    Dashboard.init(),
  ],
});

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

app.use(express.json());

// Session--------------------------------------
app.use((req, res, next) => supertokensSessionMiddleware(app, req, res, next));

app.use("/graphql", yoga);

// ---------------------------------------------
// ERROR HANDLER
// in my app's error handler, I catch the custom error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Session already exists on another device") {
    // TODO: send a custom response using res
    return res.send(400).send(err.message);
  }
  res.send(500).send(err.message);
});

// Routes------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify("ROOT OF THE SERVER"));
});

app.use("/registration", registrationRoute);

// Check context route
app.get("/check-context", async (req: Request, res: Response) => {
  const { identityId, email, sessionInfo } = app.locals;

  res.json({
    context: "HEY THIS IS YOUR CONTEXT BIAAATCH!!!",
    identityId: identityId,
    email: email,
    sessionInfo: sessionInfo,
  });
});

app.get("/protected", verifySession(), (req: SessionRequest, res) => {
  let userId = req.session!.getUserId();
  let identityId = app.locals.identityId;
  res.json({
    userId: userId,
    identityId: identityId,
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
