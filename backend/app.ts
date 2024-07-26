import express, { Express } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import initSwagger from "./utils/swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/1.0/", router);
initSwagger(app);
app.use(errorHandler);

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
  path: "/socket",
});

setupSocket(io);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
