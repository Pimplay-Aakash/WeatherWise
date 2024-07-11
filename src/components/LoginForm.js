import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseAuth'; // Import the auth instance from your firebase.js

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' });
  const [showErrors, setShowErrors] = useState(false);

  const validateUsername = (value) => {
    return value.length >= 3 && value.length <= 32
      ? ''
      : 'Username must be between 3 and 32 characters';
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/;
    return passwordRegex.test(value)
      ? ''
      : 'Password must be 8-32 characters and include a number, a special character, and both uppercase and lowercase letters';
  };

  const validateConfirmPassword = (value) => {
    return value === password ? '' : 'Passwords do not match';
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrors({ ...errors, username: validateUsername(value) });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({
      ...errors,
      password: validatePassword(value),
      confirmPassword: isSignup ? validateConfirmPassword(confirmPassword) : '',
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors({ ...errors, confirmPassword: validateConfirmPassword(value) });
  };

  const validateForm = () => {
    const newErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
      confirmPassword: isSignup ? validateConfirmPassword(confirmPassword) : '',
    };
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setShowErrors(true);
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, username, password);
        console.log('Signup successful');
      } else {
        await signInWithEmailAndPassword(auth, username, password);
        console.log('Login successful');
      }
      onClose();
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrors({ username: '', password: '', confirmPassword: '' });
    setShowErrors(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form onSubmit={handleSubmit} className="relative flex flex-col items-center overflow-hidden justify-center w-80 h-96 p-8 bg-white shadow-lg form_main">
        <div className="absolute left-[-45px] bottom-8 w-[300px] h-[320px] bg-purple-200 rotate-[45deg] rounded-[30px] shadow-md z-0"></div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="z-10 mb-2 text-2xl font-bold text-gray-800">{isSignup ? 'Sign Up' : 'Login'}</p>
        <div className="relative flex items-center justify-center w-full mb-2 inputContainer">
          <svg className="absolute left-1 inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43 .199-1.354 .328-2.29 .328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081 .67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177 .704c0-1.197.54-1.907 1.456-1.907.93 0 1.524 .738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            type="email"
            className="w-full h-8 pl-8 text-sm font-medium text-black bg-transparent border-b-2 border-gray-400 inputField focus:outline-none focus:border-purple-400"
            id="username"
            placeholder="Email"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        {showErrors && errors.username && <p className="text-red-500 text-xs z-10 mb-2">{errors.username}</p>}
        <div className="relative flex items-center justify-center w-full mb-2 inputContainer">
          <svg className="absolute left-1 inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            type="password"
            className="w-full h-8 pl-8 text-sm font-medium text-black bg-transparent border-b-2 border-gray-400 inputField focus:outline-none focus:border-purple-400"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {showErrors && errors.password && <p className="text-red-500 text-xs z-10 mb-2">{errors.password}</p>}
        {isSignup && (
          <>
            <div className="relative flex items-center justify-center w-full mb-2 inputContainer">
              <svg className="absolute left-1 inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                type="password"
                className="w-full h-8 pl-8 text-sm font-medium text-black bg-transparent border-b-2 border-gray-400 inputField focus:outline-none focus:border-purple-400"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {showErrors && errors.confirmPassword && <p className="text-red-500 text-xs z-10 mb-2">{errors.confirmPassword}</p>}
          </>
        )}
        <button
          type="submit"
          className="w-full h-10 mt-4 text-sm font-bold text-white bg-purple-500 rounded-full shadow-md z-10 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button
          type="button"
          className="z-10 mt-2 text-sm text-purple-500 hover:underline focus:outline-none"
          onClick={toggleMode}
        >
          {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
