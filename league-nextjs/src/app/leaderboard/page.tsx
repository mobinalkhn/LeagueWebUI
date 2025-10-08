'use client';

import { useState, useEffect } from 'react';

interface Team {
  name: string;
  mp: number;
  gf: number;
  ga: number;
  points: number;
}

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data as fallback
  const mockTeams: Team[] = [
    { name: 'Brazil', mp: 3, gf: 6, ga: 4, points: 7 },
    { name: 'Cameroon', mp: 3, gf: 7, ga: 6, points: 5 },
    { name: 'Switzerland', mp: 3, gf: 4, ga: 7, points: 2 },
    { name: 'Serbia', mp: 3, gf: 2, ga: 4, points: 1 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/getAllMatches');
        if (response.ok) {
          const data = await response.json();
          const calculatedTeams = calculateLeaderboard(data.matches || []);
          setTeams(calculatedTeams.length > 0 ? calculatedTeams : mockTeams);
        } else {
          setTeams(mockTeams);
        }
      } catch (error) {
        setTeams(mockTeams);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateLeaderboard = (matches: any[]): Team[] => {
    const teamStats: { [key: string]: Team } = {};

    matches.forEach((match: any) => {
      const homeTeam = match.homeTeam;
      const awayTeam = match.awayTeam;
      const homeScore = match.homeScore || 0;
      const awayScore = match.awayScore || 0;

      if (!teamStats[homeTeam]) {
        teamStats[homeTeam] = { name: homeTeam, mp: 0, gf: 0, ga: 0, points: 0 };
      }
      if (!teamStats[awayTeam]) {
        teamStats[awayTeam] = { name: awayTeam, mp: 0, gf: 0, ga: 0, points: 0 };
      }

      teamStats[homeTeam].mp += 1;
      teamStats[awayTeam].mp += 1;
      teamStats[homeTeam].gf += homeScore;
      teamStats[homeTeam].ga += awayScore;
      teamStats[awayTeam].gf += awayScore;
      teamStats[awayTeam].ga += homeScore;

      if (homeScore > awayScore) {
        teamStats[homeTeam].points += 3;
      } else if (homeScore < awayScore) {
        teamStats[awayTeam].points += 3;
      } else {
        teamStats[homeTeam].points += 1;
        teamStats[awayTeam].points += 1;
      }
    });

    return Object.values(teamStats).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const aGD = a.gf - a.ga;
      const bGD = b.gf - b.ga;
      if (bGD !== aGD) return bGD - aGD;
      return b.gf - a.gf;
    });
  };

  // Custom flag renderer for each team
  const createTeamFlag = (teamName: string): React.ReactNode => {
    const flagStyles = {
      brazil: {
        background: 'linear-gradient(to bottom, #009639 33%, #FEDF00 33%, #FEDF00 67%, #009639 67%)',
        borderRadius: '3px',
        width: '28px',
        height: '20px',
        position: 'relative' as const,
      },
      cameroon: {
        background: 'linear-gradient(to right, #009639 33%, #CE1126 33%, #CE1126 67%, #FEDF00 67%)',
        borderRadius: '3px',
        width: '28px',
        height: '20px',
      },
      switzerland: {
        background: '#FF0000',
        borderRadius: '3px',
        width: '28px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold' as const,
      },
      serbia: {
        background: 'linear-gradient(to bottom, #C6363C 33%, #1C5F99 33%, #1C5F99 67%, #FFFFFF 67%)',
        borderRadius: '3px',
        width: '28px',
        height: '20px',
      },
    };

    switch (teamName) {
      case 'Brazil':
        return <div style={flagStyles.brazil}></div>;
      case 'Cameroon':
        return <div style={flagStyles.cameroon}></div>;
      case 'Switzerland':
        return <div style={flagStyles.switzerland}>+</div>;
      case 'Serbia':
        return <div style={flagStyles.serbia}></div>;
      default:
        return <span style={{fontSize: '16px'}}>🏳️</span>;
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>League Standings</h1>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>League Standings</h1>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.thTeamName}>Team Name</th>
              <th style={styles.thCenter}>MP</th>
              <th style={styles.thCenter}>GF</th>
              <th style={styles.thCenter}>GA</th>
              <th style={styles.thCenter}>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.name} style={index % 2 === 1 ? styles.oddRow : styles.evenRow}>
                <td style={styles.tdTeamName}>
                  <div style={styles.teamContainer}>
                    <div style={styles.flagBox}>
                      {createTeamFlag(team.name)}
                    </div>
                    <span style={styles.teamName}>{team.name}</span>
                  </div>
                </td>
                <td style={styles.tdCenter}>{team.mp}</td>
                <td style={styles.tdCenter}>{team.gf}</td>
                <td style={styles.tdCenter}>{team.ga}</td>
                <td style={styles.tdCenter}>
                  <span style={styles.pointsText}>{team.points}</span>
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
    backgroundColor: '#F6F7F7',
    padding: '40px 20px 60px 20px',
    position: 'relative' as const,
  },
  
  title: {
    color: '#182C62',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '20px',
    fontWeight: '600' as const,
    textAlign: 'center' as const,
    margin: '0 0 25px 0',
  },
  
  loading: {
    textAlign: 'center' as const,
    color: '#4B5C68',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '16px',
    padding: '40px',
  },
  
  tableContainer: {
    maxWidth: '840px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E4EDF2',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'Open Sans, sans-serif',
  },
  
  headerRow: {
    backgroundColor: '#E4EDF2',
  },
  
  thTeamName: {
    color: '#4B5C68',
    fontSize: '12px',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    padding: '12px 20px',
    textAlign: 'left' as const,
    letterSpacing: '0.5px',
  },
  
  thCenter: {
    color: '#4B5C68',
    fontSize: '12px',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    padding: '12px 15px',
    textAlign: 'center' as const,
    letterSpacing: '0.5px',
  },
  
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  
  oddRow: {
    backgroundColor: '#F6F7F7',
  },
  
  tdTeamName: {
    padding: '16px 20px',
    borderBottom: '1px solid #E4EDF2',
    verticalAlign: 'middle' as const,
  },
  
  tdCenter: {
    padding: '16px 15px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #E4EDF2',
    color: '#4B5C68',
    fontSize: '14px',
    fontFamily: 'Open Sans, sans-serif',
    verticalAlign: 'middle' as const,
  },
  
  teamContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  
  flagBox: {
    width: '32px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: '1px solid #E4EDF2',
    backgroundColor: '#FFFFFF',
    overflow: 'visible',
    flexShrink: 0,
  },
  
  teamName: {
    color: '#4B5C68',
    fontSize: '16px',
    fontWeight: '400' as const,
    fontFamily: 'Open Sans, sans-serif',
  },
  
  pointsText: {
    color: '#025FEB',
    fontSize: '16px',
    fontWeight: '600' as const,
    fontFamily: 'Open Sans, sans-serif',
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
