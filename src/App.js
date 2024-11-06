import React, { useEffect, useState } from 'react';
import FriendList from './components/FriendList';
import ChatWindow from './components/ChatBox';
import './App.css'

const API_URL = "https://dummyjson.com/users"

const App = () => {
  const [friends, setFriends] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [chatHistory, setChatHistory] = useState({});

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(result => setFriends(result.users));
  }, [])

  const handleSendMessage = (message) => {
    if (!selectedFriend) return;
    const { id } = selectedFriend
    setChatHistory((prevHistory) => {
      const updatedHistory = { ...prevHistory };
      if (!updatedHistory[id]) {
        updatedHistory[id] = [];
      }
      updatedHistory[id].push({ sender: 'user', text: message });
      return updatedHistory;
    });
  };

  if (!friends) {
    return <h1>Loading Friends List...</h1>
  }

  return (
    <div className="app-container">
      <FriendList
        friends={friends}
        selectedFriend={selectedFriend}
        onSelectFriend={handleSelectFriend}
      />
      <ChatWindow
        selectedFriend={selectedFriend}
        chatHistory={chatHistory[selectedFriend?.id] || []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
