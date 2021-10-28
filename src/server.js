import "regenerator-runtime";
import "dotenv/config";

import "./db";
import "./models/Graduate";

import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import http from "http";
import path from "path";

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { resolveAny } from "dns";

const __dirname = path.resolve();
const app = express();
const logger = morgan("dev");

import Graduate from "./models/Graduate";
import { runInNewContext } from "vm";

const getHome = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

const postHome = async (req, res) => {
  const { name } = req.body;
  const exists = await Graduate.exists({ name });
  req.session.name = name;
  if (exists) {
    return res.status(400).render("home", {
      pageTitle: "Home",
      errorMessage:
        "이름이 중복됩니다. 동명이인일 경우 이름 옆에 숫자를 붙여주세요",
    });
  }
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

const getCert = async (req, res) => {
  console.log(res.locals.name);
  return res.render("cert", { pageTitle: "Cert" });
};

const localsMiddleware = (req, res, next) => {
  res.locals.name = req.session.name || {};
  next();
};

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

app.route("/").get(getHome).post(postHome);
app.get("/cert", getCert);
app.get("/show", (_, res) => res.render("show", { pageTitle: "Show" }));

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

const PORT = process.env.PORT || 4000;
const handleListen = () =>
  console.log(`🚀 Listening on http://localhost:${PORT}`);
httpServer.listen(PORT, handleListen);
