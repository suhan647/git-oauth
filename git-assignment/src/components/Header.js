import React from 'react';

const Header = ({ isLoggedIn, username, handleLogout }) => {
  return (
    <header className="bg-gray-900 fixed top-0 left-0 w-full">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4v6h4v12h6v-6h6V4H3z"
            />
          </svg>
          <a className="text-white font-bold text-lg" href="https://github.com/">
            GitHub
          </a>
        </div>
        {isLoggedIn && (
          <div className="flex items-center">
            <span className="text-white mr-2">{username}</span>
            <button
              className="text-white font-medium px-4 py-2 rounded hover:bg-gray-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
