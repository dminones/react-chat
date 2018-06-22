import React, { Component } from 'react';
import ReactExample from './containers/ReactExample/ReactExample';
import Chat from './containers/Chat';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import './App.css';
import LoginMaterial from './containers/LoginMaterial';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ ReactExample } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/login-material" component={ LoginMaterial } />
          <PrivateRoute path="/chat" component={ Chat } />
        </div>
      </Router>
    );
  }
}

export default App;