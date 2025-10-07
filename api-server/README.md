# League API Server

Backend API server for the Sports League Web UI application.

## Features

- RESTful API endpoints
- JWT token-based authentication
- CORS enabled for frontend integration
- Mock data for matches
- Health check endpoint

## API Endpoints

### Public Endpoints (No Authentication)

- `GET /api/version` - Get API version
- `GET /api/v1/getAccessToken` - Get JWT access token
- `GET /health` - Health check

### Protected Endpoints (Requires Bearer Token)

- `GET /api/v1/getAllMatches` - Get all matches data

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Usage

1. Get access token:
```bash
curl http://localhost:3001/api/v1/getAccessToken
```

2. Use token to get matches:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3001/api/v1/getAllMatches
```

## Server Info

- Port: 3001
- CORS: Enabled for all origins
- Token Expiry: 1 hour