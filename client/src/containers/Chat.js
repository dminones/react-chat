import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Messages from "../components/Messages";
import stlyed from "styled-components";
import { getToken } from "../services/user";

const Page = stlyed.div`
    height: 100%;
    position: absolute;
    width: 100%;
`;

class Chat extends Component {
  render() {
    console.log("TOKEN ->", getToken());
    return (
      <Page>
        <Messages />
        <TextInput />
      </Page>
    );
  }
}

export default Chat;
