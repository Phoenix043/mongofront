// UserList.js
import React, { useState } from 'react';

const UserList = ({ users, deleteUser, openUpdateForm }) => {
  const [revealedPasswords, setRevealedPasswords] = useState([]);

  const togglePasswordVisibility = (userId) => {
    setRevealedPasswords((prevRevealedPasswords) => {
      if (prevRevealedPasswords.includes(userId)) {
        return prevRevealedPasswords.filter((id) => id !== userId);
      } else {
        return [...prevRevealedPasswords, userId];
      }
    });
  };

  return (
    <div>
      <ul className='flex-list'>
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <div className="user-details">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>
                {/* Conditionally render the password based on visibility */}
                {revealedPasswords.includes(user._id) ? user.password : '******'}
              </p>
            </div>
            <div className="user-buttons">
              <button className="button delete-button" onClick={() => deleteUser(user._id)}>
                Delete
              </button>
              <button className="button update-button" onClick={() => openUpdateForm(user)}>
                Update
              </button>
              <button className="button reveal-password-button" onClick={() => togglePasswordVisibility(user._id)}>
                {revealedPasswords.includes(user._id) ? 'Hide Password' : 'Reveal Password'}
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
