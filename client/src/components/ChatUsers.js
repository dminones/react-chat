import React, { Component } from "react";
import styled from "styled-components";
import { subscribeUserUpdates, getCurrentUser } from "../services/chat";
import ReactList from "react-list";
import Message from "./Message";

const UsersArea = styled.div`
  height: 100%;
  padding: 10px;
  overflow: auto;
`;

const CurrentUser = ({ user }) => {
  if (!user) return null;
  return <h3>{user.name}</h3>;
};

class ChatUsers extends Component {
  state = {
    users: [],
    currentUser: null
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.subscribeToUpdates = this.subscribeToUpdates.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.connected && this.props.connected !== prevProps.connected) {
      this.subscribeToUpdates();
    }
  }

  subscribeToUpdates() {
    subscribeUserUpdates(users => {
      this.setState(() => ({
        users: users
      }));
      console.log("USERS", users);
    });

    getCurrentUser(user => {
      this.setState(() => ({
        currentUser: user
      }));
      console.log("CURRENT USER", user);
    });
  }

  renderItem(index, key) {
    const message = this.state.messages[index];
    return <Message key={key} message={message} />;
  }

  render() {
    if (!this.props.connected) {
      return <div>Connecting ...</div>;
    }
    return (
      <UsersArea>
        <CurrentUser user={this.state.currentUser} />
      </UsersArea>
    );
  }
}

export default ChatUsers;
