import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Messages from "../components/Messages";
import ChatUsers from "../components/ChatUsers";
import styled from "styled-components";
import {
  connectSocket,
  onUnauthorized,
  onDisconnect,
  subscribeUserUpdates,
  getCurrentUser,
  subscribeMessages,
  sendMessage,
  tiping
} from "../services/chat";
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
    connected: false,
    users: [],
    currentUser: {},
    messages: []
  };

  componentDidMount() {
    connectSocket(() => {
      this.setState({ connected: true });
    });
    onUnauthorized(() => this.setState({ unauthorized: true }));
    onDisconnect(() => this.setState({ connected: false }));

    getCurrentUser(user => {
      this.setState(() => ({
        currentUser: user
      }));

      subscribeUserUpdates(users => {
        this.setState(() => ({
          users: users.filter(u => u.username.indexOf(user.username) < 0)
        }));
      });
    });

    subscribeMessages(msg => {
      this.setState(prevState => ({
        messages: [...prevState.messages, msg]
      }));
      if (this.list) this.list.scrollTo(this.state.messages.length - 1);
    });
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
              currentUser={this.state.currentUser}
              users={this.state.users}
              logout={() => {
                logout();
                this.setState({ unauthorized: true });
              }}
            />
          </Users>
          <ChatRoom>
            <Messages messages={this.state.messages} />
            <TextInput
              connected={this.state.connected}
              sendMessage={sendMessage}
              tiping={tiping}
            />
          </ChatRoom>
        </PageContainer>
      </Page>
    );
  }
}

export default Chat;
