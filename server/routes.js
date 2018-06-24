const express = require("express");
var api = express.Router();
const AuthController = require("./controllers/auth.controller");
const User = require("./models/user.model");

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

module.exports = api;
