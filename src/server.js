import express from "express";
import morgan from "morgan";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { resolveAny } from "dns";

const __dirname = path.resolve();
const app = express();
const logger = morgan("dev");

const getHome = (req, res) => {
  return res.render("home");
};
const postHome = (req, res) => {
  const { name } = req.body;
  console.log(name);
  return res.redirect("/cert");
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src" + "/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
//app.use("/public", express.static(process.cwd() + "/src" + "/public"));
app.use("/assets", express.static("assets"));
//app.get("/", (_, res) => res.render("home"));
app.route("/").get(getHome).post(postHome);
app.get("/show", (_, res) => res.render("show"));
app.get("/cert", (_, res) => res.render("cert"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`🖕 Socket Event: ${event}`);
  });
  socket.on("show_btn", () => {
    wsServer.sockets.emit("showBtnHit");
  });
  socket.on("new_message", (msg, dest) => {
    wsServer.sockets.emit("show_message", msg);
    //global.location.href = dest;
  });
  //socket.on("hit", () => {
  //  wsServer.sockets.emit("hitted", "hit!");
  //});
});

const port = 4000;
const handleListen = () =>
  console.log(`🚀 Listening on http://localhost:${port}`);
httpServer.listen(port, handleListen);
