import React, { useState } from 'react';

const MainContent = ({ userData, getUserData, trendingRepos }) => {
  const [languageFilter, setLanguageFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);

  const handleLanguageFilterChange = (e) => {
    setLanguageFilter(e.target.value);
  };

  const handleStartDateFilterChange = (e) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateFilterChange = (e) => {
    setEndDateFilter(e.target.value);
  };

  const clearFilters = () => {
    setLanguageFilter('');
    setStartDateFilter(null);
    setEndDateFilter(null);
  };

  const filterByDateRange = (createdDate) => {
    if (!startDateFilter || !endDateFilter) {
      return true; // Return all repositories when no date range is selected
    }

    const startDate = new Date(startDateFilter);
    const endDate = new Date(endDateFilter);

    const repoDate = new Date(createdDate);

    return repoDate >= startDate && repoDate <= endDate;
  };

  const filteredRepos = trendingRepos.filter((repo) => {
    if (!languageFilter && !startDateFilter && !endDateFilter) {
      return true; // Return all repositories when no filters are applied
    }

    const languageMatch = languageFilter ? repo.language.toLowerCase() === languageFilter.toLowerCase() : true;
    const dateMatch = filterByDateRange(repo.created_at);

    return languageMatch && dateMatch;
  });

  return (
    <main className="container mx-auto my-20 ml-0">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData.login}</h1>
      <div className="flex items-center justify-between mb-4">
        {/* Language filter */}
        <div className="flex items-center space-x-1 mr-5">
          <label htmlFor="languageFilter" className="font-medium">
            Language:
          </label>
          <select
            id="languageFilter"
            value={languageFilter}
            onChange={handleLanguageFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            {/* Add options for different languages */}
          </select>
        </div>
        {/* Date range filter */}
        <div className="flex items-center space-x-1 ">
          <label htmlFor="startDateFilter" className="font-medium">
            Start Date:
          </label>
          <input
            type="date"
            id="startDateFilter"
            value={startDateFilter || ''}
            onChange={handleStartDateFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <label htmlFor="endDateFilter" className="font-medium mr-5">
            End Date:
          </label>
          <input
            type="date"
            id="endDateFilter"
            value={endDateFilter || ''}
            onChange={handleEndDateFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        {/* Clear Filters button */}
        <button onClick={clearFilters} className="text-white bg-blue-500 ml-2 hover:underline">
          Clear Filters
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending Repositories</h2>
        <ul>
          {filteredRepos.map((repo) => (
            <li key={repo.id} className="flex items-center py-2 border-b border-gray-300 last:border-b-0">
              {/* Repository content */}
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 w-12 h-12 mr-4">
                  <img src={repo.owner.avatar_url} alt="Avatar" className="rounded-full w-full h-full" />
                </div>
                <div className="flex flex-col w-full">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-bold text-lg"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 text-sm mt-1">{repo.description}</p>
                  <div className="mt-2 flex items-center">
                    {/* <svg
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
                    </svg> */}
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
