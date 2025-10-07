import React, { useState, useEffect } from 'react';
import LeagueService from '../services/LeagueService';
import './LeaderboardPage.css';

interface TeamStats {
  name: string;
  mp: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const leagueService = new LeagueService();
        await leagueService.fetchData();
        const leaderboardData = leagueService.getLeaderboard();
        setLeaderboard(leaderboardData);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard. Please try again later.');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getCountryCode = (teamName: string): string => {
    const countryMapping: { [key: string]: string } = {
      'Brazil': 'br',
      'Switzerland': 'ch',
      'Serbia': 'rs', 
      'Cameroon': 'cm',
      'Argentina': 'ar',
      'Germany': 'de',
      'Spain': 'es',
      'France': 'fr',
      'Italy': 'it',
      'England': 'gb',
      'Portugal': 'pt',
      'Netherlands': 'nl',
      'Belgium': 'be',
      'Croatia': 'hr',
      'Mexico': 'mx',
      'Uruguay': 'uy',
      'Colombia': 'co',
      'Chile': 'cl',
      'Peru': 'pe',
      'Ecuador': 'ec',
      'Paraguay': 'py',
      'Bolivia': 'bo',
      'Venezuela': 've'
    };
    return countryMapping[teamName] || 'xx';
  };

  const getFlagUrl = (teamName: string): string => {
    const countryCode = getCountryCode(teamName);
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };

  const getCountryFlag = (teamName: string): string => {
    const flagMapping: { [key: string]: string } = {
      'Brazil': '🇧🇷',
      'Switzerland': '🇨🇭',
      'Serbia': '🇷🇸', 
      'Cameroon': '🇨🇲',
      'Argentina': '🇦🇷',
      'Germany': '🇩🇪',
      'Spain': '🇪🇸',
      'France': '🇫🇷',
      'Italy': '🇮🇹',
      'England': '�🇧',
      'Portugal': '🇵🇹',
      'Netherlands': '🇳🇱',
      'Belgium': '🇧🇪',
      'Croatia': '🇭🇷',
      'Mexico': '🇲🇽',
      'Uruguay': '🇺🇾',
      'Colombia': '🇨🇴',
      'Chile': '🇨🇱',
      'Peru': '🇵🇪',
      'Ecuador': '🇪🇨',
      'Paraguay': '🇵🇾',
      'Bolivia': '🇧🇴',
      'Venezuela': '🇻🇪'
    };
    return flagMapping[teamName] || '🏳️';
  };

  if (loading) {
    return (
      <div className="leaderboard-page">
        <div className="container">
          <h1 className="page-title">League Standings</h1>
          <div className="loading">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-page">
        <div className="container">
          <h1 className="page-title">League Standings</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <div className="container">
        <h1 className="page-title">League Standings</h1>
        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th></th>
                <th>Team Name</th>
                <th>MP</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((team, index) => (
                <tr key={team.name} className={index % 2 === 1 ? 'even-row' : ''}>
                  <td className="position-cell">
                    {/* Empty cell for position indicator */}
                  </td>
                  <td className="team-cell">
                    <img 
                      src={getFlagUrl(team.name)} 
                      alt={`${team.name} flag`}
                      className="team-flag"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.insertAdjacentHTML('afterend', `<span class="team-flag-emoji">${getCountryFlag(team.name)}</span>`);
                      }}
                    />
                    <span className="team-name">{team.name}</span>
                  </td>
                  <td className="stat-cell">{team.mp}</td>
                  <td className="stat-cell">{team.gf}</td>
                  <td className="stat-cell">{team.ga}</td>
                  <td className="stat-cell gd-cell">
                    <span className={team.gd > 0 ? 'positive' : team.gd < 0 ? 'negative' : 'neutral'}>
                      {team.gd}
                    </span>
                  </td>
                  <td className="points-cell">
                    <span className="points-value">{team.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;