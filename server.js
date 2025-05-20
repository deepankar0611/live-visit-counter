const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

// Configure CORS
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST"],
  credentials: true
}));

// Create Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  }
});

// In-memory counter for connected clients
let visitorCount = 0;

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  // Increment counter when a new client connects
  visitorCount++;
  
  // Broadcast the new count to all clients
  io.emit('visitorCount', visitorCount);
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    visitorCount--;
    io.emit('visitorCount', visitorCount);
  });
});

// Add a basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 