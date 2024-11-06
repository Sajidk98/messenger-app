import React from 'react';

const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('');
};

const FriendList = ({ friends, selectedFriend, onSelectFriend }) => {
  return (
    <div className="friend-list">
      <h3>Friends</h3>
      <ul>
        {friends.map((friend) => {
            const {firstName, lastName, id} = friend
            return (
                <li
            key={id}
            onClick={() => onSelectFriend(friend)}
            className={selectedFriend?.id === id ? 'selected-friend' : ''}
          >
            <div className="avatar">{getInitials(firstName)}</div>
            <span className="friend-name">{`${firstName} ${lastName}`}</span>
          </li>
            )

        })}
      </ul>
    </div>
  );
};

export default FriendList;
