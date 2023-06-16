import { useEffect } from 'react';
import './App.css';

const CLIENT_ID = '7348a638d2421d929082';

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    console.log(codeParam);
  }, []);

  function loginWithGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login with GitHub</h1>
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
          onClick={loginWithGithub}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default App;
