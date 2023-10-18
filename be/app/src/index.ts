import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port: number = 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/api", (req: Request, res: Response) => {
  res.send(JSON.stringify("ZALUPKA"));
});
