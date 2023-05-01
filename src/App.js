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
    <div className="container">
      <h1 className="title">Jack's Joke Generator</h1>
      <h2 className="subheading">Press refresh for some laughs!</h2>
      <div className="joke-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {jokes.map((joke, index) => (
              <li key={index} className="joke">{joke}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;