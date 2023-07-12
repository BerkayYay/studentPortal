const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./routers/authRouter");
require("dotenv").config();
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(helmet()); // for security
app.use(
  cors({
    origin: "http://localhost:3000", // allow only this origin to connect
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET, // used to sign the cookie
    credentials: true,
    name: "sid", // session id
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto", // only set cookies over https
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax", // only allow same site requests
    },
  })
);
app.use(express.json()); // for parsing application/json

app.use("/auth", authRouter); // use the authRouter for all routes starting with /auth

io.on("connection", (socket) => {});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
