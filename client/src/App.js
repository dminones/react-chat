import React, { Component } from "react";
import Chat from "./containers/Chat";
import Login from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/chat" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
