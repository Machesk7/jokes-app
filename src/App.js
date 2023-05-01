import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'tufte-css/tufte.min.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [chuckResponse, dadResponse] = await Promise.all([
        axios.get('https://api.chucknorris.io/jokes/random'),
        axios.get('https://icanhazdadjoke.com/', {
          headers: {
          Accept: 'application/json',
          },
        }),
      ]);
      setJokes([chuckResponse.data.value, dadResponse.data.joke]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Jokes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc pl-8">
          <li className="flex items-center mb-4">
            <img src='chuck.jpg' alt="Chuck Norris" className="h-8 mr-2" />
            <span>{jokes[0]}</span>
          </li>
          <li>{jokes[1]}</li>
        </ul>
      )}
    </div>
  );
}

export default App;