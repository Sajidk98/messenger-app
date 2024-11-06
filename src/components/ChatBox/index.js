import React, { useEffect, useRef, useState } from 'react';

const ChatWindow = ({ selectedFriend, chatHistory, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const chatHistoryRef = useRef(null)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
      }
  }, [chatHistory.length]);

  if (!selectedFriend) {
    return <div className="chat-box">Select a friend to start chatting</div>;
  }

  return (
    <div className="chat-box">
      <h3>Chat with {selectedFriend.firstName}</h3>
      <div ref = {chatHistoryRef} className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'friend-message'}>
          <span className='user-message-content'>
            {msg.text}
          </span> 
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage}>
      <div className="message-input">
      <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button disabled={!message} type='submit' onClick={handleSendMessage}>Send</button>
        </div>
      </form>
      
    </div>
  );
};

export default ChatWindow;
