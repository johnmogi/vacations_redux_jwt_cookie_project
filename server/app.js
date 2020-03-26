const express = require("express");
const expressSession = require("express-session");
const authController = require("./controllers/auth-ctrl");
const consController = require("./setup");

const cors = require("cors");
const vacsController = require("./controllers/vac-ctrl");

const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 3100;
const server = express();
server.use(
  expressSession({
    name: "authenticationCookie",
    secret: "I-Want-Pina-Colada",
    resave: true,
    saveUninitialized: false
  })
);

server.use(cors({
  origin: `http://localhost/${port}`, credentials: true
}));
// Need those exact configuration for the session cookie to be saved at client side.
server.use(express.json());
server.use("/api", vacsController);
server.use("/api/auth", authController);
server.use("/api/auth", consController);
server.listen(port, () =>
  console.log(`Server Vacations running on : http://localhost/${port}`)
);

