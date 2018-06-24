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

const UserName = styled.div`
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
  font-size: 130%;
`;

const Logout = styled.div`
  display: inline-block;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CurrentUserWrapper = styled.div`
  padding: 10px;
`;

const CurrentUser = ({ user, logout }) => {
  if (!user) return null;
  return (
    <CurrentUserWrapper>
      <UserName>{user.name}</UserName>
      <Logout onClick={logout}>(logout)</Logout>
    </CurrentUserWrapper>
  );
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
        <CurrentUser user={this.state.currentUser} logout={this.props.logout} />
      </UsersArea>
    );
  }
}

export default ChatUsers;
