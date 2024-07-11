import React, { useState } from 'react';
import { FaHome, FaComments, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import LoginForm from './LoginForm'; // Import your LoginForm component here

const SideNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Log out logic
      setIsAuthenticated(false);
    } else {
      // Show login form modal
      setShowLoginForm(true);
    }
  };

  return (
    <div className="bg-white w-16 flex flex-col items-center py-4 custom-right-shadow">
      <nav className="flex flex-col space-y-4">
        <a href="/" className="text-gray-400 hover:text-blue-500" data-tooltip-id="tooltip" data-tooltip-content="Home">
          <FaHome size={24} />
        </a>
        <a href="/chat" className="text-gray-400 hover:text-blue-500" data-tooltip-id="tooltip" data-tooltip-content="Chat AI">
          <FaComments size={24} />
        </a>
        {isAuthenticated ? (
          <button onClick={handleAuthClick} className="text-gray-400 hover:text-blue-500" data-tooltip-id="tooltip" data-tooltip-content="Logout">
            <FaSignOutAlt size={24} />
          </button>
        ) : (
          <button onClick={handleAuthClick} className="text-gray-400 hover:text-blue-500" data-tooltip-id="tooltip" data-tooltip-content="Login">
            <FaSignInAlt size={24} />
          </button>
        )}
      </nav>
      <Tooltip id="tooltip" />

      {/* Render LoginForm modal if showLoginForm is true */}
      {showLoginForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <LoginForm onClose={() => setShowLoginForm(false)} />
        </div>
      )}
    </div>
  );
};

export default SideNav;
