import React from "react";
import styled from "styled-components";

const COLORS = [
  "#e21400",
  "#91580f",
  "#f8a700",
  "#f78b00",
  "#58dc00",
  "#287b00",
  "#a8f07a",
  "#4ae8c4",
  "#3b88eb",
  "#3824aa",
  "#a700ff",
  "#d300e7"
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
