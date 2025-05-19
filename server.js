const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}));

// Create Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// In-memory counter for connected clients
let visitorCount = 0;

// Socket.IO connection handling
io.on('connection', (socket) => {
  // Increment counter when a new client connects
  visitorCount++;
  
  // Broadcast the new count to all clients
  io.emit('visitorCount', visitorCount);
  
  // Handle disconnection
  socket.on('disconnect', () => {
    visitorCount--;
    io.emit('visitorCount', visitorCount);
  });
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 