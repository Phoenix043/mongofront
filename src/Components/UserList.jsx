// UserList.js
import React from 'react';

const UserList = ({ users, deleteUser, openUpdateForm }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul className='flex-list'>
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <div className="user-details">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
            <div className="user-buttons">
              <button className="button delete-button" onClick={() => deleteUser(user._id)}>
                Delete
              </button>
              <button className="button update-button" onClick={() => openUpdateForm(user)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
