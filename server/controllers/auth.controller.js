const BaseController = require("./base.controller");
const User = require("../models/user.model");

authenticatonError = new Error("Authentication error");

class AuthController extends BaseController {
  login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = User.findOne(username);

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

  authenticateSocket(socket, next) {
    const token = socket.handshake.query ? socket.handshake.query.token : null;
    if (token) {
      User.validateToken(token, async (err, decoded) => {
        if (err) return next(authenticatonError);
        socket.decoded = decoded;
        next();
      });
    } else {
      next(authenticatonError);
    }
  }
}

module.exports = new AuthController();
