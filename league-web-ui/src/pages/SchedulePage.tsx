import React, { useState, useEffect } from 'react';
import LeagueService from '../services/LeagueService';
import './SchedulePage.css';

interface Match {
  matchDate: number;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  matchPlayed: boolean;
  homeTeamScore: number;
  awayTeamScore: number;
}

const SchedulePage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const leagueService = new LeagueService();
        const matchesData = await leagueService.fetchData();
        setMatches(matchesData);
        setError(null);
      } catch (err) {
        setError('Failed to load matches. Please try again later.');
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

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
      <div className="schedule-page">
        <div className="container">
          <h1 className="page-title">League Schedule</h1>
          <div className="loading">Loading matches...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule-page">
        <div className="container">
          <h1 className="page-title">League Schedule</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="container">
        <h1 className="page-title">League Schedule</h1>
        <div className="matches-table-container">
          <table className="matches-table">
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Stadium</th>
                <th>Home Team</th>
                <th></th>
                <th>Away Team</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index} className={index % 2 === 1 ? 'even-row' : ''}>
                  <td className="date-cell">
                    <div className="date-time">
                      <div className="date">{formatDate(match.matchDate).split(' ')[0]}</div>
                      <div className="time">{formatDate(match.matchDate).split(' ')[1]}</div>
                    </div>
                  </td>
                  <td className="stadium-cell">{match.stadium}</td>
                  <td className="home-team-cell">
                    <div className="team-info">
                      <span className="team-name">{match.homeTeam}</span>
                      <img 
                        src={getFlagUrl(match.homeTeam)} 
                        alt={`${match.homeTeam} flag`}
                        className="team-flag"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.insertAdjacentHTML('afterend', `<span class="team-flag-emoji">${getCountryFlag(match.homeTeam)}</span>`);
                        }}
                      />
                    </div>
                  </td>
                  <td className="result-cell">
                    {match.matchPlayed ? (
                      <div className="score-display">
                        <span className="score-number">{match.homeTeamScore}</span>
                        <span className="score-separator">:</span>
                        <span className="score-number">{match.awayTeamScore}</span>
                      </div>
                    ) : (
                      <div className="no-result">-:-</div>
                    )}
                  </td>
                  <td className="away-team-cell">
                    <div className="team-info">
                      <img 
                        src={getFlagUrl(match.awayTeam)} 
                        alt={`${match.awayTeam} flag`}
                        className="team-flag"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.insertAdjacentHTML('afterend', `<span class="team-flag-emoji">${getCountryFlag(match.awayTeam)}</span>`);
                        }}
                      />
                      <span className="team-name">{match.awayTeam}</span>
                    </div>
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

export default SchedulePage;