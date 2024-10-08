import express, { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/shcema.ts";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";
import { supertokensSessionMiddleware } from "./middleware/supertokensSessionMiddleware.ts";
import userRoutes from "./routes/userRoutes.ts";
import watchlistRoutes from "./routes/watchlistRoutes.ts";
import identityRoutes from "./routes/identityRoutes.ts";
import app from "./app.ts";
const yoga = createYoga({ schema });
const port = process.env.PORT || 4000;

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "http://localhost:3568",
    apiKey: "core-secret-key-supertokensdb",
  },
  appInfo: {
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
            async createNewSession(input) {
              const user = await supertokens.getUser(input.userId);
              input.sessionDataInDatabase = user?.loginMethods.find(
                (it) => it.recipeId === "passwordless"
              ) && {
                type: "passwordless",
                email: user.emails[0],
              };
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
app.use((req, res, next) => supertokensSessionMiddleware(req, res, next));

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

app.use("/user", userRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/test", identityRoutes);

app.use(errorHandler());

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// https://anilist.co/
// https://rickandmortyapi.com/

// trailer
// https://api.themoviedb.org/3/movie/${id}/videos?api_key=${YOUR_API}&language=en-US

// how to use tmdb with graphql
// https://dev.to/aurelkurtula/creating-a-movie-website-with-graphql-and-react-25d4
