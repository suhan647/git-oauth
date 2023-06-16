import React from 'react';

const MainContent = ({ userData, getUserData, trendingRepos }) => {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData.login}</h1>
      <button
        className="bg-gray-800 text-white font-medium px-4 py-2 rounded hover:bg-gray-900"
        onClick={getUserData}
      >
        Get Data
      </button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trending Repositories</h2>
        <ul>
          {trendingRepos.map((repo) => (
            <li
              key={repo.id}
              className="flex items-center py-2 border-b border-gray-300 last:border-b-0"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 mr-4">
                  <img src={repo.owner.avatar_url} alt="Avatar" className="rounded-full w-full h-full" />
                </div>
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-500 text-sm">{repo.description}</p>
                  <div className="mt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h3.586a1 1 0 01.707.293l3.414 3.414a1 1 0 010 1.414l-3.414 3.414a1 1 0 01-.707.293H4a2 2 0 01-2-2V6zm2-2a2 2 0 012 2v1h1.586a1 1 0 01.707.293l3.414 3.414a1 1 0 010 1.414l-3.414 3.414a1 1 0 01-.707.293H6a2 2 0 01-2-2V6zm-2 6a2 2 0 012-2h1v1.586a1 1 0 01.293.707l3.414 3.414a1 1 0 010 1.414l-3.414 3.414a1 1 0 01-.293.707V18H2a2 2 0 01-2-2v-3zm18-1a2 2 0 01-2 2h-3.586a1 1 0 01-.707-.293l-3.414-3.414a1 1 0 010-1.414l3.414-3.414a1 1 0 01.707-.293H16a2 2 0 012 2v3zm-2 2a2 2 0 01-2-2v-1h-1.586a1 1 0 01-.707-.293l-3.414-3.414a1 1 0 010-1.414l3.414-3.414a1 1 0 01.707-.293H14a2 2 0 012 2v3zm2-6a2 2 0 01-2 2h-1v-1.586a1 1 0 01-.293-.707l-3.414-3.414a1 1 0 010-1.414l3.414-3.414a1 1 0 01.293-.707V2h1a2 2 0 012 2v3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-500 text-sm">{repo.stargazers_count}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default MainContent;
