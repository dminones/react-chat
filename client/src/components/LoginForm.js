import React, { Component } from "react";
import styled from "styled-components";
import { login } from "../services/user";

const Form = styled.form`
  padding: 10px 30px;
  text-align: center;
`;

const ErrorText = styled.div`
  padding: 0px 30px;
  color: red;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 10px auto;
  height: 50px;
  border: none;
  border-bottom: 1px solid ${p => (p.error ? "red" : "grey")};
  font-size: 130%;
`;

const UsernameInput = styled(Input)``;

const PasswordInput = styled(Input)``;

const Button = styled.button`
  margin: 20px auto;
  width: 100%;
  height: 40px;
  font-size: 130%;
  background: #008952;
  color: #fff;
  font-wiight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #07a063;
  }
`;

export default class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    submitted: false
  };

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    const that = this;
    if (!this.state.username || !this.state.password) {
      return this.setState({ submitted: true });
    }

    login(this.state.username, this.state.password).then(function(resp) {
      console.log(resp.error);
      if (!resp.error) {
        that.props.onLogin();
      } else {
        that.setState({
          error: resp.error
        });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
        <Form>
          <UsernameInput
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Enter username"
            error={!this.state.username && this.state.submitted}
          />
          <PasswordInput
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Enter password"
            error={!this.state.password && this.state.submitted}
          />
          <Button onClick={e => this.handleLogin(e)}>Login</Button>
        </Form>
      </div>
    );
  }
}
