import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Messages from "../components/Messages";
import stlyed from "styled-components";
import { getToken } from "../services/user";
import { connectSocket, onUnauthorized } from "../services/chat";
import { Redirect } from "react-router-dom";

const Page = stlyed.div`
    height: 100%;
    position: absolute;
    width: 100%;
`;

class Chat extends Component {
  state = {
    connected: false
  };

  componentDidMount() {
    connectSocket(() => {
      this.setState({ connected: true });
    });

    onUnauthorized(() => this.setState({ unauthorized: true }));
  }

  render() {
    if (this.state.unauthorized) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );
    }

    return (
      <Page>
        <Messages connected={this.state.connected} />
        <TextInput connected={this.state.connected} />
      </Page>
    );
  }
}

export default Chat;
