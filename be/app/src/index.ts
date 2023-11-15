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
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
              const existingSessions =
                await Session.getAllSessionHandlesForUser(input.userId);
              if (existingSessions.length > 0) {
                // this means that the user already has a session on some other device
                throw new Error("Session already exists on another device");
              }

              // no other session exists, and so we can continue with logging in this user
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

// app.use(errorHandler());
// ---------------------------------------------

// Session--------------------------------------
// const handleSession = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let session = await Session.getSession(req, res, {
//       sessionRequired: false,
//     });

//     res.locals.sessionData = {
//       userId: session !== undefined ? session.getUserId() : undefined,
//     };

//     next();
//   } catch (err) {
//     if (Session.Error.isErrorFromSuperTokens(err)) {
//       res
//         .status(err.type === Session.Error.INVALID_CLAIMS ? 403 : 401)
//         .send("Session related error");
//     } else {
//       next(err);
//     }
//   }
// };

// app.use(express.json());
// app.use(handleSession);

// 2-------------
// app.use("/graphql", async (req, res) => {
//   // Access session data from res.locals
//   const identityId = res.locals.sessionData.identityId;
//   // Other session-related information can be accessed similarly

//   // Your route logic (assuming you have a separate file for your GraphQL handler)
//   try {
//     const sessionInfoFromDb = res.locals.sessionData
//       ? await res.locals.sessionData.session.getSessionDataFromDatabase()
//       : undefined;

//     const context = {
//       ...initContextCache(),
//       identityId: res.locals.sessionData.identityId,
//       email: sessionInfoFromDb?.email,
//       sessionInfo: sessionInfoFromDb,
//       session: res.locals.sessionData.session,
//     };

//     // Pass the context to your GraphQL handler
//     const result = await graphqlHandler(req, res, context);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.use(express.json());

// 3--------------
// Middleware to add context to the request object
// function addContextToRequest(req: Request, res: Response, next: NextFunction) {
//   req.context = {
//     identityId: req.context?.identityId,
//     email: req.context?.email,
//     sessionInfo: req.context?.sessionInfo,
//     session: req.context?.session,
//   };
//   next();
// }
// // Apply the middleware to all routes
// app.use(addContextToRequest);

// app.use("/graphql", async (req: Request, res: Response) => {
//   try {
//     // Fetch session data using Supertokens
//     const session = await Session.getSession(req, res, {
//       sessionRequired: false,
//     });

//     // Extract session data and construct the context
//     const sessionInfoFromDb = session
//       ? await session.getSessionDataFromDatabase()
//       : undefined;

//     const context = {
//       // No caching involved, just a straightforward context creation
//       // identityId: session?.getUserId(),
//       identityId: session !== undefined ? session?.getUserId() : undefined,
//       email: sessionInfoFromDb?.email,
//       sessionInfo: sessionInfoFromDb,
//       session: session,
//     };

//     res.json({ message: "Request handled successfully", context });
//   } catch (error) {
//     if (Session.Error.isErrorFromSuperTokens(error)) {
//       return undefined; // ignore ST errors basically.
//     }
//     console.error(error);
//     res.status(500).json({ error: "Server session Error" });
//   }
// });

// 4-------------

app.use("/api", async (req: Request, res: Response, next: NextFunction) => {
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
    res.locals.identityId = session?.getUserId();
    res.locals.email = sessionInfoFromDb?.email;
    res.locals.sessionInfo = sessionInfoFromDb;
    res.locals.session = session;

    next();
  } catch (error) {
    if (Session.Error.isErrorFromSuperTokens(error)) {
      // return undefined; // ignore ST errors basically.
      return res.json({
        message: "Request handled successfully",
        context: res.locals,
      });
    }
    console.error(error);
    res.status(500).json({ error: "Server session Error" });
  }
});

// Check context route
app.get("/check-context", (req: Request, res: Response) => {
  // Access session information from res.locals
  const identityId = res.locals.identityId;
  const email = res.locals.email;
  const sessionInfo = res.locals.sessionInfo;
  const session = res.locals.session;

  // Return the context information
  res.json({
    context: "HEY THIS IS YOUR CONTEXT BIAAATCH!!!",
    identityId,
    email,
    sessionInfo,
    session,
  });
});

// Routes------------------------------------------
app.use("/registration", registrationRoute);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
