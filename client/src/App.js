import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import Page1 from './components/Page1';
import Page2 from './components/Page2';

function App() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Connect to the Socket.IO server through the environment variable
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:4000', {
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
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/page1">Page 1</Link>
              </li>
              <li>
                <Link to="/page2">Page 2</Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/" element={
              <div className="visitor-counter">
                <h1>Live Visitor Counter</h1>
                <div className="count">{visitorCount}</div>
                <p>Current visitors on this page</p>
                <p className="status">{connectionStatus}</p>

                <div className="navigation-buttons">
                  <Link to="/page1"><button>Go to Page 1</button></Link>
                  <Link to="/page2"><button>Go to Page 2</button></Link>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
