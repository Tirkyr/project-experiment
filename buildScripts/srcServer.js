var express = require("express");
var path = require("path");
var open = require("open");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var chalk = require("chalk");

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var port = 3000;
var app = express();

app.use(connectLiveReload());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.greenBright.bold("Starting app in dev mode..."));
  }
});
