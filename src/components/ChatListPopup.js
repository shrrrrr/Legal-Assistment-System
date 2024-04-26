import React from 'react';

const ChatListPopup = ({ chats }) => {
  return (
    <div>
      <h2>All Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat._id}>
            <strong>Title:</strong> {chat.title}, <strong>Username:</strong> {chat.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListPopup;
