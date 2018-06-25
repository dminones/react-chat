const users = require("./users.json");
const jwt = require("jsonwebtoken");
const Constants = require("../config/constants");

const { sessionSecret } = Constants.security;

class User {
  static findOne(username) {
    const user = users[username];
    console.log("user ->", user);
    return user ? new User(username, user) : null;
  }

  static getUserWithToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, sessionSecret, async (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(User.findOne(decoded.username));
      });
    });
  }

  static validateToken(token, callback) {
    jwt.verify(token, sessionSecret, callback);
  }

  constructor(username, user) {
    this.username = username;
    this.name = user.name;
    this.password = user.password;
  }

  /**
   * Authenticate - check if the passwords are the same
   * @public
   * @param {String} password
   * @return {Boolean} passwords match
   */
  authenticate(password) {
    return password === this.password;
  }

  /**
   * Generates a JSON Web token used for route authentication
   * @public
   * @return {String} signed JSON web token
   */

  generateToken() {
    return jwt.sign(
      { username: this.username },
      Constants.security.sessionSecret,
      {
        expiresIn: Constants.security.sessionExpiration
      }
    );
  }
}

module.exports = User;
