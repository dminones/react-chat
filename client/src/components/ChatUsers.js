import React, { Component } from "react";
import styled from "styled-components";
import { subscribeUserUpdates, getCurrentUser } from "../services/chat";
import ReactList from "react-list";

const UsersArea = styled.div`
  height: 100%;
  overflow: auto;
  color: white;
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
  padding: 30px 15px;
  background: #4c9689;
`;

const Title = styled.h3``;
const StyledReactList = styled.div`
  padding: 15px;
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
      const currentUser = this.state.currentUser;

      const otherUsers = currentUser
        ? users.filter(
            u => u.username.indexOf(this.state.currentUser.username) < 0
          )
        : users;
      this.setState(() => ({
        users: otherUsers
      }));
    });

    getCurrentUser(user => {
      this.setState(prevState => ({
        currentUser: user,
        users: prevState.users.filter(
          u => u.username.indexOf(user.username) < 0
        )
      }));
    });
  }

  renderItem(index, key) {
    const user = this.state.users[index];
    return <div key={key}>{user.name}</div>;
  }

  render() {
    if (!this.props.connected) {
      return null;
    }
    return (
      <UsersArea>
        <CurrentUser user={this.state.currentUser} logout={this.props.logout} />
        <StyledReactList>
          <Title>Connected users</Title>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.state.users.length}
            type="uniform"
            ref={c => (this.list = c)}
          />
        </StyledReactList>
      </UsersArea>
    );
  }
}

export default ChatUsers;
