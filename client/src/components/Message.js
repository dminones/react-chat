import React from "react";
import styled from "styled-components";

const COLORS = [
  "#bd4030",
  "#e1b840",
  "#7f962a",
  "#76be9f",
  "#36183c",
  "#36183c",
  "#563e57",
  "#cc4876"
];

const getUsernameColor = username => {
  //si no tengo ususario deveuelvo negro
  if (!username) return "#000";

  // Compute hash code
  var hash = 7;
  for (var i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + (hash << 5) - hash;
  }
  // Calculate color
  var index = Math.abs(hash % COLORS.length);
  return COLORS[index];
};

const MessageBlock = styled.div`
  padding: 2px 20px;
  font-size: 130%;
`;

const MessageText = styled.span``;
const MessageLog = styled.div`
  padding: 2px 20px;
  text-align: center;
  color: #555;
`;

const Username = styled.span`
  font-weight: 700;
  overflow: hidden;
  padding-right: 15px;
  text-align: right;
  color: ${({ color }) => color};
`;

const Message = ({ message }) => {
  if (message.log) return <MessageLog>{message.log}</MessageLog>;
  return (
    <MessageBlock>
      <Username color={getUsernameColor(message.username)}>
        {message.username}
      </Username>
      <MessageText>{message.message}</MessageText>
    </MessageBlock>
  );
};

export default Message;
