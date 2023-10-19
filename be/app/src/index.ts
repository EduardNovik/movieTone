import express, { Request, Response } from "express";
import cors from "cors";
import currentRoute from "./api/current";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify("ROOT OF THE SERVER"));
});

app.get("/api", (req: Request, res: Response) => {
  res.send(JSON.stringify("ZALUPKA"));
});

// Routes
app.use("/api/current", currentRoute);
