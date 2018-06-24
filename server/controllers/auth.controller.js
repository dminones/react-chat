const BaseController = require("./base.controller");
const User = require("../models/user.model");

class AuthController extends BaseController {
  login(req, res, next) {
    console.log("LOGIN");
    try {
      const { username, password } = req.body;
      const user = User.findOne(username);
      console.log("user -> ", user);

      if (!user || !user.authenticate(password)) {
        const err = new Error("Please verify your credentials.");
        err.status = 401;
        return next(err);
      }

      const token = user.generateToken();
      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
