import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Messages from "../components/Messages";
import ChatUsers from "../components/ChatUsers";
import styled from "styled-components";
import { connectSocket, onUnauthorized, onDisconnect } from "../services/chat";
import { logout } from "../services/user";
import { Redirect } from "react-router-dom";

const Page = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
`;

const PageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const ChatRoom = styled.div`
  width: 70%;
  float: left;
  position: relative;
  height: 100%;
`;

const Users = styled.div`
  width: 30%;
  float: left;
  height: 100%;
  background: #4d394b;
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
    onDisconnect(() => this.setState({ connected: false }));
  }

  render() {
    if (this.state.unauthorized) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location }
          }}
        />
      );
    }

    return (
      <Page>
        <PageContainer>
          <Users>
            <ChatUsers
              connected={this.state.connected}
              logout={() => {
                logout();
                this.setState({ unauthorized: true });
              }}
            />
          </Users>
          <ChatRoom>
            <Messages connected={this.state.connected} />
            <TextInput connected={this.state.connected} />
          </ChatRoom>
        </PageContainer>
      </Page>
    );
  }
}

export default Chat;
