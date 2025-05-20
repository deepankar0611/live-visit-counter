import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Connect to the Socket.IO server through ngrok
    const socket = io('visitor-counter-backend-production.up.railway.app', {
      transports: ['websocket'],
      secure: true,
      reconnection: true,
      reconnectionAttempts: 5
    });

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnectionStatus('Connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionStatus('Connection failed');
    });

    // Listen for visitor count updates
    socket.on('visitorCount', (count) => {
      setVisitorCount(count);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <div className="visitor-counter">
        <h1>Live Visitor Counter</h1>
        <div className="count">{visitorCount}</div>
        <p>Current visitors on this page</p>
        <p className="status">{connectionStatus}</p>
      </div>
    </div>
  );
}

export default App;
