import React, { Component } from "react";
import stlyed from "styled-components";
import { setToken } from "../services/user";
import { Redirect } from "react-router-dom";

export const Form = stlyed.form`
	padding: 0;
`;

export const EmailInput = stlyed.input`
	
`;

export const PasswordInput = stlyed.input`
	
`;

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    const that = this;
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `username=${this.state.username}&password=${this.state.password}`
    })
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        setToken(data.token);
        that.setState({ redirectToReferrer: true });
      })
      .catch(console.log);
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/chat" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Form>
        <input
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
          type="text"
          placeholder="Enter username"
        />
        <input
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="Enter password"
        />
        <button onClick={this.handleLogin}>Login</button>
      </Form>
    );
  }
}

export default Login;
