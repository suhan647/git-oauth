import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import './App.css';

const CLIENT_ID = '7348a638d2421d929082';

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    console.log(codeParam);

    if (codeParam && localStorage.getItem('accessToken') === null) {
      async function getAccessToken() {
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
              setIsLoggedIn(true);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  async function getUserData() {
    await fetch('http://localhost:4000/getUserData', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (Object.keys(data).length !== 0) {
          setUserData(data);
          fetchTrendingRepos();
        } else {
          console.log('User data is empty.');
        }
      })
      .catch((error) => {
        console.log('Error while fetching user data:', error);
      });
  }

  async function fetchTrendingRepos() {
    await fetch('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc')
      .then((response) => response.json())
      .then((data) => {
        console.log('Trending repos', data);
        if (data.items) {
          setTrendingRepos(data.items);
        } else {
          console.log('No trending repositories found.');
        }
      })
      .catch((error) => {
        console.log('Error while fetching trending repositories:', error);
      });
  }

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  }

  function handleLogout() {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setRerender(!rerender);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header
        isLoggedIn={isLoggedIn}
        username={userData.login}
        handleLogout={handleLogout}
      />
      <div className="flex-1 flex items-center justify-center">
        {isLoggedIn ? (
          <div className="w-full max-w-2xl mx-auto ">
            <main className="container mx-auto px-4">
              <MainContent userData={userData} trendingRepos={trendingRepos} />
            </main>
          </div>
        ) : (
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Login with GitHub
            </h1>
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
              onClick={loginWithGithub}
            >
              Login with GitHub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
