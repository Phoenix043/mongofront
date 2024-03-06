// App.jsx
import React, { useState, useEffect } from 'react';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList'
import UserUpdateForm from './Components/UserUpdateForm'; // Adjust the path accordingly

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch initial user list on component mount
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    try {
      const response = await fetch('https://peach-jumpy-asphalt.glitch.me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const addedUser = await response.json();
      if(addedUser.error) alert(addedUser.error)
      else setUsers((prevUsers) => [...prevUsers, addedUser]);
      // Update the users state with the new data
      
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://peach-jumpy-asphalt.glitch.me/users');
      const userList = await response.json();
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`https://peach-jumpy-asphalt.glitch.me/users/${userId}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (updatedUser) => {

    try {
      const response = await fetch(`https://peach-jumpy-asphalt.glitch.me/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const updatedUserData = await response.json();

      // Update the users state with the new data
    
      if(updatedUserData.error)alert(updatedUserData.error)
      else setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUserData._id ? updatedUserData : user)));
      
      // Reset selectedUser after updating
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const openUpdateForm = (user) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  }

  return (
    <div>
      <UserForm addUser={addUser} />
      {showUpdateForm && selectedUser && (
        <UserUpdateForm
          onSubmit={updateUser}
          initialData={{ name: selectedUser.name, email: selectedUser.email }}
          onCancel={() => {
            setShowUpdateForm(false);
            setSelectedUser(null);
          }}
        />
      )}

      <UserList users={users} deleteUser={deleteUser} openUpdateForm={openUpdateForm} />
    </div>
  );
};

export default App;
