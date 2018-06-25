import React, { Component } from "react";
import styled from "styled-components";
import ReactList from "react-list";
import Message from "./Message";

const ChatArea = styled.div`
  height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  padding-top: 20px;
`;

class Messages extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(index, key) {
    const message = this.props.messages[index];
    return <Message key={key} message={message} />;
  }

  render() {
    return (
      <ChatArea>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.messages.length}
          type="uniform"
          ref={c => (this.list = c)}
        />
      </ChatArea>
    );
  }
}

export default Messages;
