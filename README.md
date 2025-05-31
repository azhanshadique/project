# CodeAcademy EdTech Platform

A comprehensive EdTech platform for learning programming with interactive challenges, video tutorials, and more.

## Features

- **Interactive Learning:** Watch coding tutorials, read articles, and solve hands-on coding challenges
- **Code Editor:** Write and run code in multiple languages with real-time feedback
- **User Progress Tracking:** Track your learning journey with visual dashboards and achievements
- **Authentication System:** Secure login and user profile management
- **Responsive Design:** Works seamlessly across desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- Chart.js for data visualization
- CodeMirror for the code editor
- Font Awesome for icons

### Backend
- Node.js with Express
- MongoDB for data storage
- JWT for authentication
- RESTful API architecture

## Project Structure

```
codeacademy/
├── client/              # Frontend files
│   ├── assets/          # Images and other static assets
│   ├── css/             # CSS stylesheets
│   ├── js/              # JavaScript files
│   └── *.html           # HTML pages
├── server/              # Backend files
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
└── README.md            # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/codeacademy.git
   cd codeacademy
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/codeacademy
   JWT_SECRET=your_jwt_secret
   JUDGE0_API_KEY=your_judge0_api_key
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user data

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update user profile
- `GET /api/users/progress/:id` - Get user progress
- `GET /api/users/leaderboard` - Get user leaderboard

### Challenges
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/:id` - Get a specific challenge
- `POST /api/challenges` - Create a new challenge (admin only)
- `PUT /api/challenges/:id` - Update a challenge (admin only)
- `DELETE /api/challenges/:id` - Delete a challenge (admin only)

### Submissions
- `POST /api/submissions` - Submit code for a challenge
- `GET /api/submissions/:id` - Get a specific submission
- `GET /api/submissions/user/me` - Get all submissions for current user

## Demo User

You can use the following credentials to log in to the demo:
- Email: demo@example.com
- Password: password123

## License

This project is licensed under the MIT License - see the LICENSE file for details.