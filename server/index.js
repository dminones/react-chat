const express = require("express");
const app = express();
const path = require("path");
const AuthController = require("./controllers/auth.controller");
const User = require("./models/user.model");

// set the port of our application
const port = process.env.PORT || 5000;

require("./middleware")(app);

var api = express.Router();
// Authentication
api.post("/auth/login", AuthController.login);

api.get("/hello/:msg", function(req, res) {
  const { authorization } = req.headers;
  User.getUserWithToken(authorization).then(user => {
    res.json({ response: user.name + ": " + req.params.msg });
    res.status(201);
  });
});

api.get("/", function(req, res) {
  res.json({ version: "1.0" });
  res.status(201);
});

app.use("/api", api);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(
    "/static",
    express.static(path.join(__dirname, "../client/build/static"))
  );
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.put("/api/user/:username/login", function(req, res) {
  var username = req.params.username;
  if (username in users) {
    var e = { loggedin: false };
    res.json(e);
    res.status(409);
    return;
  }
  console.log("[LOGIN]\t" + username);
  var e = { loggedin: true };
  users[username] = "";

  res.json(e);
  res.status(201);
});

app.put("/api/user/:username/join/:socket", function(req, res) {
  var username = req.params.username;
  var socketid = "#" + req.params.socket;
  if (!(username in users)) {
    var e = { error: "El usuario '" + username + "' no ha iniciado sesión." };
    res.json(e);
    res.status(409);
    return;
  }
  console.log("[JOIN]\t" + username);
  var e = { username: username, socket: socketid };
  users[username] = socketid;

  var socket = sockets[socketid];
  if (socket) {
    socket.broadcast.emit("chat", {
      log: "<" + username + "> ingreso al chat",
      timestamp: Date.now()
    });
    messages.push({
      log: "<" + username + "> ingreso al chat",
      timestamp: Date.now()
    });
  }

  res.json(e);
  res.status(201);
});

app.delete("/api/user/:username/exit", function(req, res) {
  var username = req.params.username;
  if (username in users) {
    console.log("[LEAVE]\t" + username);
    var socketid = users[username];
    delete users[username];

    var socket = sockets[socketid];
    console.log("will close socket: " + socketid);
    if (socket != undefined) {
      socket.disconnect();
    }
    delete sockets[socketid];
    res.status(200);
    res.end();
    return;
  }
  res.status(404);
});

const server = app.listen(port, function() {
  console.log("Server running on http://localhost:" + port);
});

require("./socket")(server);
