import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <ul>
          {jokes.map((joke, index) => (
            <li key={index}>{joke}</li>
          ))}
      </ul>
      )}
    </div>
  );
}

export default App;