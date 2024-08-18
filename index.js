const path = require("path");
const cron = require("node-cron");
const express = require("express");
const app = express();
const chalk = require("chalk");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const PORTANGINAMO = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
app.use(require("./cors"));
app.set("json spaces", 4);
const servers = [
  "https://aspintol1.onrender.com"
];
const routes = [
  {
    path: "/",
    file: "index.html"
  },
  {
    path: "/online",
    file: "online.html"
  },
  {
    path: "/config",
    file: "config.html"
  }
];
routes.forEach(route => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "public", route.file));
  });
});
app.get("/active_user", async(req, res) => {
  let actives = [];
  for (const server of servers){
  const response = await axios.get(server + "/active_user").catch(err => null);
  if (Array.isArray(response.data) && response.data.length > 0) {
    actives = actives.concat(response.data);
  }
  }
  return res.json(actives.length > 0 ? actives : []);
});

app.get("/commands", async(req, res) => {
  const {
    server
  } = req.query;
  if (!server) {
    return res.json({
      error: "No server parameter."
    });
  }
  const server_ = await axios.get(`${servers[server]}/commands`);
  if (!server_) return res.json({
    error: `An error occured on: Server ${server || "0"}`
  });
  if (server_.data){
    return res.json(server_.data);
  }
  const response = await axios.get(server + "/active_user");
  if (Array.isArray(response.data) && response.data.length > 0) {
    actives = actives.concat(response.data);
  }
  return res.json({
      error: `Something went wrong while connecting to server ${server || "0"}`
    });
});

app.get("/nethTools", async(req,res) => {
  const {
    type,
    pass,
    server
  } = req.query;
  if (!server){
    return res.json({
      error: "No server parameter."
    });
  }
  const server_ = await axios.get(`${servers[server]}/nethTools`, {
    params: {
      type,pass
    }
  });
  if (!server_) return res.json({
    error: `An error occured on: Server ${server || "0"}`
  });
  if (server_.data){
    return res.json(server_.data);
  } else {
    return res.json({
      error: `Something went wrong while connecting to server ${server || "0"}`
    });
  }
});
app.post("/BotifyWiegine", async (req, res) => {
  let {
    appstate,
    pass,
    server
    } = req.body;
  if (!server){
    return res.json({
      error: "No server parameter."
    });
  }
  const server_ = await axios.post(`${servers[server]}/BotifyWiegine`, {
      appstate,pass
    });
  if (!server_) return res.json({
    error: `An error occured on: Server ${server || "0"}`
  });
  if (server_.data){
    return res.json(server.data);
  } else {
    return res.json({
      error: `Something went wrong while connecting to server ${server || "0"}`
    });
  }
});

app.post("/login", async(req, res) => {
 const { state, commands, prefix, admin, botname,
    autos = {
    autopost: false
   },
   utils = {},
   server
 } = req.body;
 if (!server){
    return res.json({
      error: "No server parameter."
    });
  }
  const server_ = await axios.post(`${servers[server]}/login`, {
       state, commands, prefix, admin,
       botname,
       autos,
       utils
    });
  if (!server_) return res.json({
    error: true,
    message: `An error occured on: Server ${server || "0"}`
  });
  if (server_.data){
    return res.json(server.data);
  } else {
    return res.json({
      error: true,
      message: `Something went wrong while connecting to server ${server || "0"}`
    });
  }
});

app.listen(PORTANGINAMO, () => {
  console.log(chalk.green(`Project Botify Started 🤖`));
  console.log(chalk.blue(`Running: http://localhost:${PORTANGINAMO}`));
  });
process.on("unhandledRejection", reason => {
  console.log(chalk.red(`Error: ${reason}`));
});