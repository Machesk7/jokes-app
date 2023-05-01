import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'tufte-css/tufte.min.css';




function JokeApp() {
  const [jokes, setMyJokes] = useState([]);
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
      setMyJokes([chuckResponse.data.value, dadResponse.data.joke]);
      setLoading(false);
    };

    fetchData();
  }, []);

  
    
 

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Jack's Joke Generator</h1>
      <h2 className="text-3xl font-bold text-center mb-8">Click Refresh for some Laughs!</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc pl-8">
          <li className="flex items-center mb-4">
            <img src='data:image/jpeg;base64,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' alt="Chuck Norris" className="h-8 mr-2" />
            <span>{jokes[0]}</span>
          </li>
          <img src='https://thumbs.dreamstime.com/b/man-barbequing-garden-7230370.jpg' alt="generic dad" className="h-8 mr-2" />
          <li>{jokes[1]}</li>
        </ul>
      )}
    </div>
  );
  
}


export default JokeApp;