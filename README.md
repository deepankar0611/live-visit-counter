# Real-time Visitor Counter

A simple real-time visitor counter built with React and Socket.IO.

## Project Structure

- `server.js` - Express + Socket.IO backend server
- `client/` - React frontend application

## Setup Instructions

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

## Running the Application

1. Start the backend server (from the root directory):
```bash
npm start
```

2. Start the React frontend (in a new terminal, from the client directory):
```bash
cd client
npm start
```

The backend will run on http://localhost:4000 and the frontend on http://localhost:3000.

## Features

- Real-time visitor counter
- Automatic updates when users connect/disconnect
- Clean and minimal UI
- CORS enabled for local development 