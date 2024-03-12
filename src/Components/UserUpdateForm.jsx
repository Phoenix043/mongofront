// UserUpdateForm.js
import React, { useState } from 'react';

const UserUpdateForm = ({ onSubmit, initialData, onCancel }) => {
  const [userData, setUserData] = useState(initialData);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
    setUserData({ name: '', email: '', password: '' }); // Reset form fields after submission, including the password
  };

  return (
    <div className="popup-container blur">
      <div className="popup">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />

          {/* New Password Field */}
          <label>Password:</label>
          <input type="password" name="password" value={userData.password || ''} onChange={handleInputChange} required />

          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateForm;
