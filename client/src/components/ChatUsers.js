import React, { Component } from "react";
import styled from "styled-components";
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

const Tiping = styled.span`
  color: #ccc;
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
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(index, key) {
    const user = this.props.users[index];
    return (
      <div key={key}>
        {user.name} {user.tiping && <Tiping>tiping...</Tiping>}
      </div>
    );
  }

  render() {
    return (
      <UsersArea>
        <CurrentUser user={this.props.currentUser} logout={this.props.logout} />
        <StyledReactList>
          <Title>Connected users</Title>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.props.users.length}
            type="uniform"
            ref={c => (this.list = c)}
          />
        </StyledReactList>
      </UsersArea>
    );
  }
}

export default ChatUsers;
