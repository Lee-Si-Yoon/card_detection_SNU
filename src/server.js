import express from "express";
import morgan from "morgan";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const __dirname = path.resolve();
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src" + "/views");
app.use(logger);
app.use("/public", express.static(process.cwd() + "/src" + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/show", (_, res) => res.render("show"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

function noop() {} //noop is nothing

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`🖕 Socket Event: ${event}`);
  });
  socket.on("new_message", (msg) => {
    wsServer.sockets.emit("show_message", msg);
  });
  socket.on("hit", () => {
    wsServer.sockets.emit("hitted", "hit!");
  });
});

const handleListen = () => console.log(`🚀 Listening on http://localhost:3000`);
httpServer.listen(4000, handleListen);
