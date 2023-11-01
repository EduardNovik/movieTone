import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { createSchema, createYoga } from "graphql-yoga";
// import registrationRoute from "./service/registration.ts";
// import registerRoute from "./api/register";
// import sessionRoute from "./api/session";
// import loginRoute from "./api/login";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "WTF!",
    },
  },
});

const app = express();
const yoga = createYoga({ schema });
const port = process.env.PORT;

supertokens.init({
  framework: "express",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "http://localhost:3567",
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

app.use("/graphql", yoga);
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

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

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Routes-----------
// app.use("/registration", registrationRoute);
// app.use("/api/register", registerRoute);
// app.use("/api/auth", loginRoute);
// app.use("/api/auth", registerRoute);
