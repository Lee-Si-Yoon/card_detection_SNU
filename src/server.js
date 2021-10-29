import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import http from "http";
import { getHome, postHome, getCert, localsMiddleware } from "./controllers";

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src" + "/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);
app.use("/assets", express.static("assets"));

//Pages
app.route("/").get(getHome).post(postHome);
app.get("/cert", getCert);
app.get("/show", (_, res) => res.render("show", { pageTitle: "Show" }));

//SocketIO
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"], //paste localhost:4000/admin to url
    credentials: true,
  },
});
instrument(wsServer, {
  auth: false,
});

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`🖕 Socket Event: ${event}`);
  });
  socket.on("new_message", (msg) => {
    wsServer.sockets.emit("show_message", msg);
  });
});

export default httpServer;
