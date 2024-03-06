// UserForm.js
import React, { useState } from 'react';

const UserForm = ({ addUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(userData);
    setUserData({ name: '', email: '' }); // Reset form fields after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />

      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
