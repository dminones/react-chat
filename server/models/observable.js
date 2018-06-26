// define a class
class Observable {
  // each instance of the Observer class
  // starts with an empty array of things (observers)
  // that react to a state change
  constructor() {
    this.observers = {};
  }

  // add the ability to subscribe to a new object / DOM element
  // essentially, add something to the observers array
  subscribe(action, f) {
    if (!this.observers[action]) {
      this.observers[action] = {};
    }
    this.observers[action] = f;
  }

  subscribeAll(f) {
    Object.values(this.actions).forEach(action => this.subscribe(action, f));
  }

  // add the ability to unsubscribe from a particular object
  // essentially, remove something from the observers array
  unsubscribe(action) {
    if (!this.observers[action]) return;
    delete this.observers[action];
  }

  unsubscribeAll() {
    Object.values(this.actions).forEach(action => this.unsubscribe(action));
  }

  // update all subscribed objects / DOM elements
  // and pass some data to each of them
  notify(action, data) {
    if (!this.observers[action]) return;
    this.observers[action](data);
  }
}

module.exports = Observable;
