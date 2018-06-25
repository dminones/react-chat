import React, { Component } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

import { Redirect } from "react-router-dom";

const FormWrapper = styled.div`
  background: white;
  margin: 100px auto;
  max-width: 500px;
  min-height: 300px;
  border-radius: 10px;
  padding: 50px 20px;
`;

const FormPage = styled.div`
  background: #f2f2f2;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  width: 100%;
`;

class Login extends Component {
  state = {};
  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    this.setState({ redirectToReferrer: true });
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
      <FormPage>
        <FormWrapper>
          <Title>React Chat</Title>
          <LoginForm onLogin={this.onLogin} />
        </FormWrapper>
      </FormPage>
    );
  }
}

export default Login;
