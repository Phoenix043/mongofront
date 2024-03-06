// App.jsx
import React, { useState, useEffect } from 'react';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList'
import UserUpdateForm from './Components/UserUpdateForm'; // Adjust the path accordingly
import Loading from './Components/Loading';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch initial user list on component mount
    fetchUsers();
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  const addUser = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://peach-jumpy-asphalt.glitch.me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      setIsLoading(false);
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
      setIsLoading(true);
      const response = await fetch('https://peach-jumpy-asphalt.glitch.me/users');
      const userList = await response.json();
      setIsLoading(false);
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      await fetch(`https://peach-jumpy-asphalt.glitch.me/users/${userId}`, {
        method: 'DELETE',
      });
      fetchUsers();
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (updatedUser) => {

    try {
      setIsLoading(true);
      const response = await fetch(`https://peach-jumpy-asphalt.glitch.me/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      setIsLoading(false);
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
      {/* Conditional Rendering: Show Loading Component if loading state is true */}
      {isLoading && <Loading message="Loading..." />}

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

      <UserList
        users={users}
        deleteUser={deleteUser}
        openUpdateForm={(user) => {
          setSelectedUser(user);
          setShowUpdateForm(true);
        }}
        // Pass setisLoading function to update isLoading state
        setisLoading={setIsLoading}
      />
    </div>
  );
};

export default App;
