import * as Sentry from "@sentry/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import { clientUrl } from "./constants";
import { corsOptions } from "./helpers";
import { broadcastsRouter } from "./routes/broadcasts";
import { favouritesRouter } from "./routes/favourites";
import { fixturesRouter } from "./routes/fixtures";
import { leaguesRouter } from "./routes/leagues";
import { newsRouter } from "./routes/news";
import { predictionsRouter } from "./routes/predictions";
import { searchRouter } from "./routes/search";
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
app.use(leaguesRouter);
app.use(fixturesRouter);
app.use(teamsRouter);
app.use(predictionsRouter);
app.use(broadcastsRouter);

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
