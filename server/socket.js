const User = require("./models/user.model");
const AuthController = require("./controllers/auth.controller");

var users = {};
var messages = [];

function addMessage(socket, message) {
  messages.push(message);
  socket.broadcast.emit("chat", message);
  socket.emit("chat", message);
}

function addConnectedUser(socket, user) {
  const username = user.username;
  if (!users[username]) {
    users[username] = user;
    addMessage(socket, {
      log: user.name + " ingreso al chat",
      timestamp: Date.now()
    });
    socket.broadcast.emit("usersUpdate", Object.values(users));
    socket.emit("usersUpdate", Object.values(users));
  }
}

function removeConnectedUser(socket, user) {
  delete users[user.username];
  socket.broadcast.emit("usersUpdate", Object.values(users));
  addMessage(socket, {
    log: user.name + " se fue del chat",
    timestamp: Date.now()
  });
}

function sendAllMessages(socket) {
  messages.forEach(function(obj) {
    socket.emit("chat", obj);
  });
}

function updateCurrentUser(socket, user) {
  socket.emit("currentUser", user);
}

module.exports = function(server) {
  var io = require("socket.io").listen(server);

  io.use(AuthController.authenticateSocket);

  io.on("connection", function(socket) {
    const { username } = socket.decoded;
    const user = User.findOne(username);

    addConnectedUser(socket, user);
    updateCurrentUser(socket, user);
    sendAllMessages(socket);

    socket.on("chat", function(msg) {
      const username = socket.decoded.username;
      const message = msg.message;
      const user = User.findOne(username);
      addMessage(socket, {
        username: user.name,
        message: message,
        timestamp: Date.now()
      });
    });

    socket.on("disconnect", function(reason) {
      const user = User.findOne(socket.decoded.username);
      removeConnectedUser(socket, user);
    });
  });
};
