import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "./helpers/cors";
import { createServer } from "http";
import { clientUrl } from "./constants";
import { Server } from "socket.io";
import { footballRouter } from "./routes/football";
import { favouritesRouter } from "./routes/favourites";
import { searchRouter } from "./routes/search";
import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middleware for API logging
app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(footballRouter);
app.use(favouritesRouter);
app.use(searchRouter);
app.use(signupRouter);
app.use(signinRouter);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: clientUrl,
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Footy API + TypeScript Server");
});

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
