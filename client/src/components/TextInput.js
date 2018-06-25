import React, { Component } from "react";
import styled from "styled-components";
import { sendMessage, tiping } from "../services/chat";

const Input = styled.input`
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
  font-size: 100%;
  background: ${p => (p.disabled ? "#ddd" : "#fff")};
`;

const EMPTY_INPUT = "";

class TextInput extends Component {
  state = {
    input: EMPTY_INPUT
  };

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _handleKeyPress(e) {
    if (e.key === "Enter" && this.state.input !== EMPTY_INPUT) {
      sendMessage(this.state.input);
      this.setState({
        input: EMPTY_INPUT
      });
    }
  }

  _handleOnChange(e) {
    const input = e.target.value;
    tiping(input !== EMPTY_INPUT);

    this.setState({
      input
    });
  }

  render() {
    return (
      <Input
        value={this.state.input}
        placeholder={this.props.connected ? "Type here..." : "Connecting..."}
        onKeyPress={this._handleKeyPress}
        onChange={this._handleOnChange}
        disabled={!this.props.connected}
      />
    );
  }
}

export default TextInput;
