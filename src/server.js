import "regenerator-runtime";
import "dotenv/config";

import "./db";
import "./models/Graduate";

import express from "express";
import morgan from "morgan";
import http from "http";
import path from "path";

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { resolveAny } from "dns";

const __dirname = path.resolve();
const app = express();
const logger = morgan("dev");

import Graduate from "./models/Graduate";

const getHome = (req, res) => {
  const pageTitle = "Home";
  return res.render("home", { pageTitle: "Home" });
};

const postHome = async (req, res) => {
  const { name } = req.body;
  try {
    await Graduate.create({
      name: name,
    });
    return res.redirect("/cert");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src" + "/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("assets"));

app.route("/").get(getHome).post(postHome);
app.get("/show", (_, res) => res.render("show", { pageTitle: "Show" }));
app.get("/cert", (_, res) => res.render("cert", { pageTitle: "Cert" }));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"], //paste localhost:3000/admin to url
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

const port = 4000;
const handleListen = () =>
  console.log(`🚀 Listening on http://localhost:${port}`);
httpServer.listen(port, handleListen);
