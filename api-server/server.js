const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'league-web-ui-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - matches from the specification
const mockMatches = [
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

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authorization header missing or invalid format'
    });
  }
  
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.tokenData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

// Routes

// GET /api/version - Get API Version (No auth required)
app.get('/api/version', (req, res) => {
  res.json({
    success: true,
    version: "v1.0"
  });
});

// GET /api/v1/getAccessToken - Get Access Token (No auth required)
app.get('/api/v1/getAccessToken', (req, res) => {
  try {
    const tokenPayload = {
      id: uuidv4(),
      issued: Date.now(),
      expires: Date.now() + (60 * 60 * 1000) // 1 hour expiry
    };
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
      success: true,
      access_token: token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate access token'
    });
  }
});

// GET /api/v1/getAllMatches - Get All Matches (Auth required)
app.get('/api/v1/getAllMatches', verifyToken, (req, res) => {
  try {
    res.json({
      success: true,
      matches: mockMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve matches'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 League API Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET /api/version`);
  console.log(`   GET /api/v1/getAccessToken`);
  console.log(`   GET /api/v1/getAllMatches (requires Bearer token)`);
  console.log(`   GET /health`);
});