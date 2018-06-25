import openSocket from "socket.io-client";
import { getToken, logout } from "../services/user";
let socket;

export function getSocket() {
  return socket;
}

export function connectSocket(callback) {
  const token = getToken();
  if (token) {
    socket = openSocket("/", {
      query: { token }
    });
  }

  socket.on("connect", callback);
}

export function onUnauthorized(callback) {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }

  socket.on("error", function(err) {
    if (err === "Authentication error") {
      logout();
      callback();
    }
  });
}

export function onDisconnect(callback) {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }

  socket.on("disconnect", () => {
    socket.off("chat");
    callback();
  });
}

export function sendMessage(message) {
  if (!socket) {
    console.log("NO SOCKET, username ->", message);
    return;
  }

  socket.emit("chat", { message });
}

var subscribedToMessages = false;
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

export function disconnect() {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }

  socket.disconnect();
}

export function tiping(tiping) {
  if (!socket) {
    console.log("NO SOCKET");
    return;
  }
  console.log("TIPING");
  socket.emit("tiping", tiping);
}
