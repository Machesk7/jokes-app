import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [premierLeagueStandings, setPremierLeagueStandings] = useState([]);
  const [laLigaStandings, setLaLigaStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [premierLeagueResponse, laLigaResponse] = await Promise.all([
        axios.get('https://api.football-data.org/v2/competitions/PL/standings', {
          headers: {
            'X-Auth-Token': '60bd862c3a77463091377f3a9a575d07',
          },
        }),
        axios.get('https://api.football-data.org/v2/competitions/PD/standings', {
          headers: {
            'X-Auth-Token': '60bd862c3a77463091377f3a9a575d07',
          },
        }),
      ]);

      setPremierLeagueStandings(premierLeagueResponse.data.standings[0].table);
      setLaLigaStandings(laLigaResponse.data.standings[0].table);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Premier League Standings</h2>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {premierLeagueStandings.map((team) => (
                <tr key={team.team.id}>
                  <td>{team.position}</td>
                  <td>{team.team.name}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>La Liga Standings</h2>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {laLigaStandings.map((team) => (
                <tr key={team.team.id}>
                  <td>{team.position}</td>
                  <td>{team.team.name}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;