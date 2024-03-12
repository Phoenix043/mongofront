// UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '', // New password field
  });

  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isFormValid, setIsFormValid] = useState(true); // Initially set to true to render the button

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled before submitting
    if (validateForm()) {
      addUser(userData);
      setUserData({ name: '', email: '', password: '' }); // Reset form fields after submission
    } else {
      console.error('Please fill in all necessary details.');
    }
  };

  const validateForm = () => {
    // Check if all fields are filled
    const isValid = userData.name.trim() !== '' && userData.email.trim() !== '' && userData.password.trim() !== '';
    setIsFormValid(isValid);
    return isValid;
  };

  const handleMouseMove = (e) => {
    // Update button position based on cursor coordinates only if the form is not valid
    if (!isFormValid) {
      setButtonPosition({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    // Attach mousemove event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFormValid]); // Dependency on isFormValid ensures the effect runs when form validity changes

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />

      {/* New Password Field */}
      <label>Password:</label>
      <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />

      {/* Conditionally render the runaway button based on the form validity */}
      <button
        className={`runaway-button ${!isFormValid ? 'run-away' : ''}`}
        type="submit"
      >
        Create User
      </button>
    </form>
  );
};

export default UserForm;
