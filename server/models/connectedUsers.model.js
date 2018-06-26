const Observable = require("./observable");

class ConnectedUsers extends Observable {
  constructor() {
    super();
    this._users = {};
    this.actions = Object.freeze({
      ADD: "add",
      REMOVE: "remove",
      UPDATE: "update"
    });
  }

  getConectedUsers() {
    return Object.values(this._users);
  }

  addUser(user) {
    this._users[user.username] = user;
    this.notify(this.actions.ADD, user);
  }

  removeUser(user) {
    delete this._users[user.username];
    this.notify(this.actions.REMOVE, user);
  }

  updateUser(user) {
    this._users[user.username] = user;
    this.notify(this.actions.UPDATE, user);
  }

  notify(action, user) {
    super.notify(action, user);
  }
}

module.exports = ConnectedUsers;
