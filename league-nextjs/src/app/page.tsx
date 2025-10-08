'use client';

import { useState, useEffect } from 'react';

// Match interface for type safety
interface Match {
  matchDate: number;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  matchPlayed: boolean;
  homeTeamScore?: number;
  awayTeamScore?: number;
}

// Sample match data for testing - will be replaced by API data
const mockMatches: Match[] = [
  {
    matchDate: 1711606560000, // 28.3.2025 06:56
    stadium: "Maracanã",
    homeTeam: "Brazil",
    awayTeam: "Serbia",
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 0
  },
  {
    matchDate: 1711606560000, // 28.3.2025 06:56
    stadium: "Stade de Suisse",
    homeTeam: "Switzerland",
    awayTeam: "Serbia",
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 2
  },
  {
    matchDate: 1711606560000, // 28.3.2025 06:56
    stadium: "Stadion Rajko Mitic",
    homeTeam: "Serbia",
    awayTeam: "Cameroon",
    matchPlayed: true,
    homeTeamScore: 0,
    awayTeamScore: 1
  },
  {
    matchDate: 1711606560000, // 28.3.2025 06:56
    stadium: "Maracanã",
    homeTeam: "Brazil",
    awayTeam: "Switzerland",
    matchPlayed: true,
    homeTeamScore: 3,
    awayTeamScore: 0
  },
  {
    matchDate: 1711606560000, // 28.3.2025 06:56
    stadium: "Maracanã",
    homeTeam: "Brazil",
    awayTeam: "Cameroon",
    matchPlayed: true,
    homeTeamScore: 4,
    awayTeamScore: 4
  },
  {
    matchDate: 1711606560000, // 28.3.2025 06:56
    stadium: "Stade de Suisse",
    homeTeam: "Switzerland",
    awayTeam: "Cameroon",
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 2
  }
];

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatchData = async () => {
      try {
        setLoading(true);
        
        // First get auth token from backend
        const authRes = await fetch('http://localhost:3001/api/v1/getAccessToken');
        const authData = await authRes.json();
        
        if (authData.success) {
          // Now fetch the actual match data
          const matchRes = await fetch('http://localhost:3001/api/v1/getAllMatches', {
            headers: {
              'Authorization': `Bearer ${authData.access_token}`
            }
          });
          
          const matchData = await matchRes.json();
          
          if (matchData.success && matchData.matches) {
            console.log(`Loaded ${matchData.matches.length} matches from API`);
            setMatches(matchData.matches);
          } else {
            // Use local data if API fails
            console.log('API returned no data, using mock matches');
            setMatches(mockMatches);
          }
        } else {
          setMatches(mockMatches);
        }
      } catch (err) {
        // Fallback to static data during development
        console.log('Using local data:', err);
        setMatches(mockMatches);
      } finally {
        setLoading(false);
      }
    };

    loadMatchData();
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

  // Helper function to render team flags
  const renderTeamFlag = (teamName: string): React.ReactNode => {
    const flagDesigns = {
      brazil: {
        background: 'linear-gradient(to bottom, #009639 33%, #FEDF00 33%, #FEDF00 67%, #009639 67%)',
        borderRadius: '2px',
        width: '28px',
        height: '20px',
        position: 'relative' as const,
        border: '1px solid #DDD',
      },
      cameroon: {
        background: 'linear-gradient(to right, #009639 33%, #CE1126 33%, #CE1126 67%, #FEDF00 67%)',
        borderRadius: '2px',
        width: '28px',
        height: '20px',
        border: '1px solid #DDD',
      },
      switzerland: {
        background: '#FF0000',
        borderRadius: '2px',
        width: '28px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold' as const,
        border: '1px solid #DDD',
      },
      serbia: {
        background: 'linear-gradient(to bottom, #C6363C 33%, #1C5F99 33%, #1C5F99 67%, #FFFFFF 67%)',
        borderRadius: '2px',
        width: '28px',
        height: '20px',
        border: '1px solid #DDD',
      },
    };

    // Return appropriate flag based on team
    if (teamName === 'Brazil') return <div style={flagDesigns.brazil}></div>;
    if (teamName === 'Cameroon') return <div style={flagDesigns.cameroon}></div>;
    if (teamName === 'Switzerland') return <div style={flagDesigns.switzerland}>+</div>;
    if (teamName === 'Serbia') return <div style={flagDesigns.serbia}></div>;
    
    // Default fallback
    return <span style={{fontSize: '14px'}}>🏳️</span>;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>League Schedule</h1>
        <div style={styles.loading}>Loading matches...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>League Schedule</h1>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date/Time</th>
              <th style={styles.th}>Stadium</th>
              <th style={styles.th}>Home Team</th>
              <th style={styles.th}></th>
              <th style={styles.th}>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} style={index % 2 === 0 ? {} : styles.evenRow}>
                <td style={index % 2 === 0 ? styles.td : {...styles.td, backgroundColor: '#F8F9FA'}}>
                  <div style={styles.dateTime}>
                    <div>{formatDate(match.matchDate).split(' ')[0]}</div>
                    <div style={styles.time}>{formatDate(match.matchDate).split(' ')[1]}</div>
                  </div>
                </td>
                <td style={index % 2 === 0 ? styles.td : {...styles.td, backgroundColor: '#F8F9FA'}}>{match.stadium}</td>
                <td style={index % 2 === 0 ? {...styles.td, textAlign: 'right', paddingRight: '15px'} : {...styles.td, backgroundColor: '#F8F9FA', textAlign: 'right', paddingRight: '15px'}}>
                  <div style={{...styles.teamInfo, justifyContent: 'flex-end'}}>
                    <span style={{marginRight: '8px'}}>{match.homeTeam}</span>
                    <span style={styles.flag}>{renderTeamFlag(match.homeTeam)}</span>
                  </div>
                </td>
                <td style={index % 2 === 0 ? styles.td : {...styles.td, backgroundColor: '#F8F9FA'}}>
                  {match.matchPlayed ? (
                    <span style={styles.score}>
                      {match.homeTeamScore} : {match.awayTeamScore}
                    </span>
                  ) : (
                    <span style={styles.score}>-</span>
                  )}
                </td>
                <td style={index % 2 === 0 ? {...styles.td, textAlign: 'left', paddingLeft: '15px'} : {...styles.td, backgroundColor: '#F8F9FA', textAlign: 'left', paddingLeft: '15px'}}>
                  <div style={{...styles.teamInfo, justifyContent: 'flex-start'}}>
                    <span style={styles.flag}>{renderTeamFlag(match.awayTeam)}</span>
                    <span style={{marginLeft: '8px'}}>{match.awayTeam}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={styles.apiVersion}>API Version: 1.0</div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 120px)',
    backgroundColor: '#F0F0F0',
    padding: '50px 40px 60px 40px',
    position: 'relative' as const,
  },
  title: {
    color: '#182C62',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 20px 0',
    textAlign: 'center' as const,
  },
  loading: {
    textAlign: 'center' as const,
    color: '#4B5C68',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '16px',
    padding: '40px',
  },
  tableContainer: {
    width: '90%',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'Open Sans, sans-serif',
    backgroundColor: '#FFFFFF',
  },
  th: {
    backgroundColor: '#E6E9ED',
    color: '#4B5C68',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    padding: '12px 20px',
    textAlign: 'center' as const,
    border: 'none',
    letterSpacing: '0.5px',
  },
  td: {
    color: '#4B5C68',
    fontSize: '14px',
    padding: '15px 20px',
    borderBottom: '1px solid #E6E9ED',
    textAlign: 'center' as const,
    verticalAlign: 'middle' as const,
    backgroundColor: '#FFFFFF',
  },
  evenRow: {
    backgroundColor: '#F8F9FA',
  },
  dateTime: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '3px',
    lineHeight: 1.2,
  },
  time: {
    fontSize: '11px',
    color: '#666666',
    fontWeight: '400',
  },
  teamInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'flex-start',
  },
  flag: {
    display: 'inline-block',
    flexShrink: 0,
  },
  score: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#333333',
    letterSpacing: '1px',
  },
  
  // Responsive styles
  '@media (max-width: 900px)': {
    container: {
      padding: '30px 15px 50px 15px',
    },
    title: {
      fontSize: '18px',
      margin: '0 0 20px 0',
    },
    tableContainer: {
      margin: '0',
      borderRadius: '6px',
    },
    th: {
      padding: '8px 6px',
      fontSize: '10px',
    },
    td: {
      padding: '12px 6px',
      fontSize: '12px',
    },
    teamInfo: {
      gap: '4px',
      minWidth: '90px',
    },
    score: {
      fontSize: '13px',
    },
    apiVersion: {
      bottom: '10px',
      right: '10px',
      fontSize: '10px',
    },
  },
  
  '@media (max-width: 500px)': {
    container: {
      padding: '30px 10px 20px 10px',
    },
    title: {
      fontSize: '16px',
      margin: '0 0 12px 0',
    },
    th: {
      padding: '8px 5px',
      fontSize: '10px',
    },
    td: {
      padding: '12px 5px',
      fontSize: '12px',
    },
    teamInfo: {
      gap: '4px',
      minWidth: '80px',
    },
    score: {
      fontSize: '13px',
    },
    time: {
      fontSize: '10px',
    },
  },
  
  apiVersion: {
    position: 'absolute' as const,
    bottom: '20px',
    right: '20px',
    color: '#4B5C68',
    fontSize: '11px',
    fontFamily: 'Open Sans, sans-serif',
    opacity: 0.8,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
};