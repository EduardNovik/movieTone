import express, { Request, Response } from "express";
import movieRouter from "./routes/Movies";

const app = express();

const port = 4000;

app.listen(port, () => {
  console.log("server is running");
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello server");
});

app.use("/movies", movieRouter);

// const fetch = require("node-fetch");

// const url = "https://api.themoviedb.org/3/configuration";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzQzMzcyNWQ1YmE0ZDZjZmJkNGU5ZjE2NGM2MmUyMyIsInN1YiI6IjY1MjQ2NThjNzQ1MDdkMDEzOTVmNjNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b6GcInguwRwWjg12RrHJEefSQiIGSFcQJ-eNSqu8LXg",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error("error:" + err));

// https://api.themoviedb.org/3/trending/movie/{time_window}
// "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
// b3433725d5ba4d6cfbd4e9f164c62e23;
