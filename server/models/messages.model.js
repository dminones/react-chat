const Observable = require("./observable");
const Constants = require("../config/constants");
const MAX_MESSAGES = Constants.maxMessages;

class Messages extends Observable {
  constructor() {
    super();
    this.messages = [];
    this.actions = Object.freeze({
      ADD: "add"
    });
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message) {
    this.messages.push(message);
    this.messages = this.messages.slice(
      Math.max(this.messages.length - MAX_MESSAGES + 1, 0)
    );
    this.notify(this.actions.ADD, message);
  }
}

module.exports = Messages;
