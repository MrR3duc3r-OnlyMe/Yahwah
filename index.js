const path = require("path");
const cron = require("node-cron");
const express = require("express");
const app = express();
const chalk = require("chalk");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const PORTANGINAMO = process.env.PORT || 3000;
const serverList = require("./server.js");
const {
  encryptData,
  decryptData
} = require("./encrypt.js");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
app.use(require("./cors"));
app.set("json spaces", 4);
const servers = (num) => serverList[num].server;
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
app.post("/decrypt", async(req, res) => {
  const {
    code
  } = req.body;
  if (!code) return res.json({
    error: "Failed to decrypt"
  });
  return res.send(decryptData(code));
});

app.get("/servers", async(req, res) => {
  const serverLists = [];
  for (const serv of serverList){
    const {
      name, description
    } = serv;
    serverLists.push({
      name: encryptData(name),
      description: encryptData(description)
    });
  }
  return res.json(serverLists.length > 0 ? serverLists : []);
});

app.get("/active_user", async(req, res) => {
  let actives = [];
  for (const server of serverList){
  const response = await axios.get(server.server + "/active_user").catch(err => null);
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
  const server_ = await axios.get(`${servers(parseInt(server) - 1)}/commands`);
  if (!server_) return res.json({
    error: `An error occured on: Server ${server || "0"}`
  });
  if (server_.data){
    return res.json(server_.data);
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
  if ((type.toLowerCase() === "restart" || type.toLowerCase() === "clearestart") && server.toLowerCase() === "all"){
  for (const all of serverList){
    try {
    const alls = await axios.get(`${all.server}/nethTools`, {
      params: {
        type,
        pass
      }
    });
    } catch (error){
      return;
    }
  }
  return res.json({
    status: "Successfully restarted all server!"
  });
  } 
  const server_ = await axios.get(`${servers(parseInt(server) - 1)}/nethTools`, {
    params: {
      type,
      pass
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
  const server_ = await axios.post(`${servers(parseInt(server) - 1)}/BotifyWiegine`, {
      appstate,pass
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

app.post("/login", async(req, res) => {
 const {
   state,
   commands,
   prefix,
   admin,
   botname,
   autos,
   server
 } = req.body;
 if (!server){
    return res.json({
      error: "No server parameter."
    });
  }
  const server_ = await axios.post(`${servers(parseInt(server) - 1)}/login`, {
       state, commands, prefix, admin,
       botname,
       autos
    });
  if (!server_) return res.json({
    error: true,
    message: `An error occured on: Server ${server || "0"}`
  });
  if (server_.data){
    return res.json(server_.data);
  } else {
    return res.json({
      error: true,
      message: `Something went wrong while connecting to server ${server || "0"}`
    });
  }
});

app.listen(PORTANGINAMO, () => {
  console.log(chalk.blue(`Running: http://localhost:${PORTANGINAMO}`));
  });
process.on("unhandledRejection", reason => {
  console.log(chalk.red(`Error: ${reason}`));
});