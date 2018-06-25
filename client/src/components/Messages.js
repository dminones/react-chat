import React, { Component } from "react";
import styled from "styled-components";
import { subscribeMessages } from "../services/chat";
import ReactList from "react-list";
import Message from "./Message";

const ChatArea = styled.div`
  height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  padding-top: 20px;
`;

class Messages extends Component {
  state = {
    messages: []
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.subscribeToMessages = this.subscribeToMessages.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.connected && this.props.connected !== prevProps.connected) {
      this.subscribeToMessages();
    }
  }

  subscribeToMessages() {
    subscribeMessages(msg => {
      this.setState(prevState => ({
        messages: [...prevState.messages, msg]
      }));
      if (this.list) this.list.scrollTo(this.state.messages.length - 1);
    });
  }

  renderItem(index, key) {
    const message = this.state.messages[index];
    return <Message key={key} message={message} />;
  }

  render() {
    return (
      <ChatArea>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.state.messages.length}
          type="uniform"
          ref={c => (this.list = c)}
        />
      </ChatArea>
    );
  }
}

export default Messages;
