# League Web UI

A responsive Sports League Web application built with React and Node.js, featuring schedule display, leaderboard, and API integration.

## 🏆 Features

- **Schedule Page**: View all matches with dates, teams, and scores
- **Leaderboard**: Team standings with statistics (MP, GF, GA, GD, Points)
- **404 Page**: Custom error page with responsive design
- **Responsive Design**: Optimized for Desktop (1000px), Tablet (750px), and Mobile (500px)
- **API Integration**: RESTful backend with JWT authentication
- **Flag Support**: Country flags for all teams
- **Real-time Data**: Live data from API with fallback to mock data

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.0) with TypeScript
- **React Router** for navigation
- **CSS3** with responsive design
- **Open Sans** font family

### Backend
- **Node.js** with Express.js
- **JWT** authentication
- **CORS** enabled
- **UUID** for token generation

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Frontend Setup
```bash
cd league-web-ui
npm install
npm start
```
The frontend will run on `http://localhost:3000`

### Backend Setup
```bash
cd api-server  
npm install
npm start
# or
node server.js
```
The API server will run on `http://localhost:3001`

## 📱 Responsive Breakpoints

- **Desktop**: 1001px and above
- **Tablet**: 501px - 1000px
- **Mobile**: 500px and below

## 🔗 API Endpoints

### Authentication
- `GET /api/v1/getAccessToken` - Get JWT token

### Data
- `GET /api/v1/getAllMatches` - Get all matches (requires Bearer token)
- `GET /api/version` - Get API version
- `GET /health` - Health check

## 🎨 Design Specifications

### Colors
- Primary Blue: `#025FEB`
- Text Dark: `#182C62`
- Text Medium: `#4B5C68`
- Border/Background: `#E4EDF2`
- Light Gray: `#F6F7F7`
- White: `#FFFFFF`

### Typography
- Font Family: 'Open Sans', sans-serif
- Menu: 16px
- Page Headings: 24px
- Table Headers: 12px
- Table Content: 14px
- Bold Text: 16px

## 📂 Project Structure

```
LeagueWebUI/
├── league-web-ui/          # React Frontend
│   ├── public/
│   │   └── assets/         # Logo and images
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── data/           # Mock data
│   └── package.json
├── api-server/             # Node.js Backend
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## 🏃‍♂️ Running the Application

1. **Start the API Server:**
   ```bash
   cd api-server
   node server.js
   ```

2. **Start the Frontend:**
   ```bash
   cd league-web-ui
   npm start
   ```

3. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3001`

## 🧪 Testing

The application includes:
- Responsive design testing
- API integration testing
- Error handling and fallbacks
- Cross-browser compatibility

## 📄 License

This project is created for demonstration purposes.

---

**Developed with ❤️ using React & Node.js**