import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import * as Sentry from "@sentry/node";
import { corsOptions } from "./helpers";
import { createServer } from "http";
import { clientUrl } from "./constants";
import { Server } from "socket.io";
import { newsRouter } from "./routes/news";
import { favouritesRouter } from "./routes/favourites";
import { leaguesRouter } from "./routes/leagues";
import { searchRouter } from "./routes/search";
import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";
import { currentUserRouter } from "./routes/auth/user";
import { fixturesRouter } from "./routes/fixtures";
import { predictionsRouter } from "./routes/predictions";
import { teamsRouter } from "./routes/teams";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const app: Express = express();
const port = process.env.PORT;

// Sentry for general error logging
app.use(Sentry.Handlers.requestHandler());

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(cookieParser());

// Routers
app.use(newsRouter);
app.use(favouritesRouter);
app.use(searchRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(leaguesRouter);
app.use(fixturesRouter);
app.use(teamsRouter);
app.use(predictionsRouter);

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
  res.send("CurrentScore Football API");
});

app.use(Sentry.Handlers.errorHandler());

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
