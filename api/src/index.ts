import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { footballRouter } from "./routes/football";

dotenv.config();

const app: Express = express();

// CORS Configuration
const allowedOrigins = [
  "http://127.0.0.1:3001",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://127.0.0.0",
];

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};

app.use(express.json({ limit: "10kb" }));

app.use(cors(corsOptions));

const port = process.env.PORT;

app.use(footballRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Footy API + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
