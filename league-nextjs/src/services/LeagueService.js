import mockMatches from '../data/mockData.js';

/**
 * LeagueService class for managing league matches and generating leaderboard
 * This class provides methods to fetch data from API, manage matches, and calculate team standings
 */
class LeagueService {
  constructor() {
    this.matches = [];
    this.apiBaseUrl = 'http://localhost:3001';
  }

  /**
   * Set the array of matches to LeagueService
   * @param {Array} matches - Array of match objects
   */
  setMatches(matches) {
    this.matches = matches || [];
  }

  /**
   * Get the matches array that was set by setMatches
   * @returns {Array} Array of match objects
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Generate and return the leaderboard based on current matches
   * @returns {Array} Array of team objects with standings
   */
  getLeaderboard() {
    if (!this.matches || this.matches.length === 0) {
      return [];
    }

    // Get all unique teams
    const teams = new Set();
    this.matches.forEach(match => {
      teams.add(match.homeTeam);
      teams.add(match.awayTeam);
    });

    // Calculate stats for each team
    const teamStats = {};
    teams.forEach(team => {
      teamStats[team] = {
        name: team,
        mp: 0, // matches played
        gf: 0, // goals for
        ga: 0, // goals against
        gd: 0, // goal difference  
        points: 0
      };
    });

    // Process each played match
    this.matches.forEach(match => {
      if (match.matchPlayed) {
        // Update matches played
        teamStats[match.homeTeam].mp++;
        teamStats[match.awayTeam].mp++;

        // Update goals
        teamStats[match.homeTeam].gf += match.homeTeamScore;
        teamStats[match.homeTeam].ga += match.awayTeamScore;
        teamStats[match.awayTeam].gf += match.awayTeamScore;
        teamStats[match.awayTeam].ga += match.homeTeamScore;

        // Update points
        if (match.homeTeamScore > match.awayTeamScore) {
          // Home team wins
          teamStats[match.homeTeam].points += 3;
        } else if (match.homeTeamScore < match.awayTeamScore) {
          // Away team wins
          teamStats[match.awayTeam].points += 3;
        } else {
          // Draw
          teamStats[match.homeTeam].points += 1;
          teamStats[match.awayTeam].points += 1;
        }
      }
    });

    // Calculate goal difference
    Object.values(teamStats).forEach(team => {
      team.gd = team.gf - team.ga;
    });

    // Convert to array and sort
    const leaderboard = Object.values(teamStats);
    
    // Sort by the tiebreaker rules
    leaderboard.sort((a, b) => {
      // First: Sort by points (descending)
      if (a.points !== b.points) {
        return b.points - a.points;
      }

      // Second: Head-to-head points (if same points)
      const headToHeadResult = this.calculateHeadToHead([a, b]);
      if (headToHeadResult !== 0) {
        return headToHeadResult;
      }

      // Third: Goal difference (descending)
      if (a.gd !== b.gd) {
        return b.gd - a.gd;
      }

      // Fourth: Goals scored (descending)
      if (a.gf !== b.gf) {
        return b.gf - a.gf;
      }

      // Fifth: Alphabetical order (ascending)
      return a.name.localeCompare(b.name);
    });

    return leaderboard;
  }

  /**
   * Calculate head-to-head results for teams with same points
   * @param {Array} teams - Teams to compare
   * @returns {number} Comparison result
   */
  calculateHeadToHead(teams) {
    if (teams.length !== 2) return 0;

    const [teamA, teamB] = teams;
    let teamAH2H = 0;
    let teamBH2H = 0;

    // Find head-to-head matches
    this.matches.forEach(match => {
      if (!match.matchPlayed) return;

      const isH2H = (match.homeTeam === teamA.name && match.awayTeam === teamB.name) ||
                    (match.homeTeam === teamB.name && match.awayTeam === teamA.name);

      if (isH2H) {
        if (match.homeTeam === teamA.name) {
          // Team A is home
          if (match.homeTeamScore > match.awayTeamScore) {
            teamAH2H += 3;
          } else if (match.homeTeamScore < match.awayTeamScore) {
            teamBH2H += 3;
          } else {
            teamAH2H += 1;
            teamBH2H += 1;
          }
        } else {
          // Team B is home
          if (match.homeTeamScore > match.awayTeamScore) {
            teamBH2H += 3;
          } else if (match.homeTeamScore < match.awayTeamScore) {
            teamAH2H += 3;
          } else {
            teamAH2H += 1;
            teamBH2H += 1;
          }
        }
      }
    });

    return teamBH2H - teamAH2H; // Higher head-to-head points first
  }

  /**
   * Fetch data from the backend API
   * @returns {Promise} Promise that resolves with matches data
   */
  async fetchData() {
    try {
      console.log('Starting API data fetch...');
      
      // First get access token
      console.log('Fetching access token from:', `${this.apiBaseUrl}/api/v1/getAccessToken`);
      const tokenResponse = await fetch(`${this.apiBaseUrl}/api/v1/getAccessToken`);
      
      if (!tokenResponse.ok) {
        throw new Error(`Failed to get access token: ${tokenResponse.status}`);
      }
      
      const tokenData = await tokenResponse.json();
      console.log('Token response:', tokenData);
      
      if (!tokenData.success || !tokenData.access_token) {
        throw new Error('Invalid token response');
      }

      // Then fetch matches with the token
      console.log('Fetching matches with token...');
      const matchesResponse = await fetch(`${this.apiBaseUrl}/api/v1/getAllMatches`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      if (!matchesResponse.ok) {
        throw new Error(`Failed to fetch matches: ${matchesResponse.status}`);
      }

      const matchesData = await matchesResponse.json();
      console.log('Matches data received:', matchesData);
      
      if (!matchesData.success || !Array.isArray(matchesData.matches)) {
        throw new Error('Invalid matches response');
      }

      // Set the matches and return them
      this.setMatches(matchesData.matches);
      console.log('API data successfully loaded:', matchesData.matches.length, 'matches');
      return matchesData.matches;

    } catch (error) {
      console.error('Error fetching data from API, falling back to mock data:', error);
      console.log('Loading mock data...');
      // Fall back to mock data for development/testing
      this.setMatches(mockMatches);
      console.log('Mock data loaded:', mockMatches.length, 'matches');
      return mockMatches;
    }
  }
}

export default LeagueService;