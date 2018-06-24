const jwt = require("jsonwebtoken");
const Constants = require("./config/constants");
const User = require("./models/user.model");

module.exports = function(server) {
  var sockets = {};
  var io = require("socket.io").listen(server);
  var users = {};

  io.use(function(socket, next) {
    const { sessionSecret } = Constants.security;
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        sessionSecret,
        async (err, decoded) => {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  });

  var messages = [];
  io.on("connection", function(socket) {
    const { username } = socket.decoded;
    const user = User.findOne(username);

    if (!users[username]) {
      users[username] = user;

      socket.broadcast.emit("chat", {
        log: user.name + " ingreso al chat",
        timestamp: Date.now()
      });

      messages.push({
        log: user.name + " ingreso al chat",
        timestamp: Date.now()
      });

      console.log("connected users -> ", users);
      socket.broadcast.emit("usersUpdate", Object.values(users));
      socket.emit("usersUpdate", Object.values(users));
      console.log("connection -> ", user);
    }

    socket.emit("currentUser", user);

    messages.forEach(function(obj) {
      console.log("msg -> ", obj);
      socket.emit("chat", obj);
    });

    socket.on("chat", function(msg) {
      const username = socket.decoded.username;
      const message = msg.message;
      const user = User.findOne(username);

      var toSend = {
        username: user.name,
        message: message,
        timestamp: Date.now()
      };
      messages.push(toSend);
      console.log(
        "[CHAT]\tfrom: '" + username + "' - message: '" + message + "'"
      );
      socket.broadcast.emit("chat", toSend);
      socket.emit("chat", toSend);
    });

    socket.on("disconnect", function(reason) {
      console.log("DISCONNECT", reason);
      delete users[socket.decoded.username];
      socket.broadcast.emit("usersUpdate", Object.values(users));

      socket.broadcast.emit("chat", {
        log: user.name + " se fue del chat",
        timestamp: Date.now()
      });

      messages.push({
        log: user.name + " se fue del chat",
        timestamp: Date.now()
      });
    });
  });
};
