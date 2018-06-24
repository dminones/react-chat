const express = require("express");
var api = express.Router();
const AuthController = require("./controllers/auth.controller");

// Authentication
api.post("/auth/login", AuthController.login);

api.get("/", function(req, res) {
  res.json({ version: "1.0" });
  res.status(201);
});

module.exports = api;
