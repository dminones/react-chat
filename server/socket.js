const User = require("./models/user.model");
const AuthController = require("./controllers/auth.controller");
const ConectedUsers = require("./models/connectedUsers.model");
const Messages = require("./models/messages.model");

var connectedUsers = new ConectedUsers();
var messages = new Messages();

function sendAllMessages(socket) {
  messages.getMessages().forEach(function(obj) {
    socket.emit("chat", obj);
  });
}

function updateCurrentUser(socket, user) {
  socket.emit("currentUser", user);
}

module.exports = function(server) {
  var io = require("socket.io").listen(server);

  io.use(AuthController.authenticateSocket);

  connectedUsers.subscribe(connectedUsers.actions.ADD, user => {
    io.emit("usersUpdate", connectedUsers.getConectedUsers());

    messages.addMessage({
      log: user.name + " ingreso al chat",
      timestamp: Date.now()
    });
  });

  connectedUsers.subscribe(connectedUsers.actions.REMOVE, user => {
    io.emit("usersUpdate", connectedUsers.getConectedUsers());

    messages.addMessage({
      log: user.name + " se fue del chat",
      timestamp: Date.now()
    });
  });

  connectedUsers.subscribe(connectedUsers.actions.UPDATE, () => {
    io.emit("usersUpdate", connectedUsers.getConectedUsers());
  });

  messages.subscribe(messages.actions.ADD, message => {
    io.emit("chat", message);
  });

  io.on("connection", function(socket) {
    const { username } = socket.decoded;
    const user = User.findOne(username);

    //Get updates so far
    updateCurrentUser(socket, user);
    sendAllMessages(socket);

    connectedUsers.addUser(user);

    // Subscribe to messages from client
    socket.on("chat", function(msg) {
      const username = socket.decoded.username;
      const message = msg.message;
      const user = User.findOne(username);
      messages.addMessage({
        username: user.name,
        message: message,
        timestamp: Date.now()
      });
    });

    socket.on("disconnect", function(reason) {
      const user = User.findOne(socket.decoded.username);
      connectedUsers.removeUser(user);
    });

    socket.on("tiping", function(tiping) {
      const user = User.findOne(socket.decoded.username);
      user.setTiping(tiping);
      connectedUsers.updateUser(user);
    });
  });
};
