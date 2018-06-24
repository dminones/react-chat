import openSocket from "socket.io-client";
import { getToken, setToken } from "../services/user";
let socket;

export function getSocket() {
  return socket;
}

export function connectSocket(callback) {
  const token = getToken();
  if (token) {
    socket = openSocket("http://localhost:5000", {
      query: { token }
    });
  }

  socket.on("connect", callback);
}

export function onUnauthorized(callback) {
  socket.on("error", function(err) {
    if (err === "Authentication error") {
      setToken(null);
      callback();
    }
  });
}

export function sendMessage(message) {
  if (!socket) {
    console.log("NO SOCKET, username ->", message);
    return;
  }

  socket.emit("chat", { message });
}

export function subscribeMessages(callback) {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }

  socket.on("chat", callback);
}

export function subscribeUserUpdates(callback) {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }

  socket.on("usersUpdate", callback);
}

export function getCurrentUser(callback) {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }

  socket.on("currentUser", callback);
}
