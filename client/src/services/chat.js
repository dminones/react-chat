import openSocket from "socket.io-client";
import { getToken, logout } from "../services/user";
let socket;

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
  if (!socket) return;
  socket.on("error", function(err) {
    if (err === "Authentication error") {
      logout();
      callback();
    }
  });
}

export function onDisconnect(callback) {
  if (!socket) return;
  socket.on("disconnect", () => {
    socket.off("chat");
    callback();
  });
}

export function sendMessage(message) {
  if (!socket) return;
  socket.emit("chat", { message });
}

export function subscribeMessages(callback) {
  if (!socket) return;
  socket.on("chat", callback);
}

export function subscribeUserUpdates(callback) {
  if (!socket) return;
  socket.on("usersUpdate", callback);
}

export function getCurrentUser(callback) {
  if (!socket) return;
  socket.on("currentUser", callback);
}

export function disconnect() {
  if (!socket) return;
  socket.disconnect();
}

export function tiping(tiping) {
  if (!socket) return;
  socket.emit("tiping", tiping);
}
