// const { Server } = require('socket.io');

// // Function to initialize the WebSocket server
// const setupWebSocket = (server) => {
//   const io = new Server(server, { cors: { origin: '*' } }); // Attach WebSocket to the server

//   io.on('connection', (socket) => {
//     console.log('A user(viewer) connected to WebSocket');

//     // Admin sends image updates
//     socket.on('updateViewer', (image) => {
//       io.emit('updateViewer', image); // Broadcast to all viewers
//     });

//     // Handle disconnects
//     socket.on('disconnect', () => {
//       console.log('A user disconnected from WebSocket');
//     });
//   });

//   return io; // Return the io instance if needed
// };

// module.exports = setupWebSocket;
const { Server } = require('socket.io');

// Function to initialize the WebSocket server
const setupWebSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } }); // Attach WebSocket to the server
  let currentPlayerImage = ''; // Store the current player's image globally

  io.on('connection', (socket) => {
    console.log('A user (viewer) connected to WebSocket:', socket.id);

    // Send the current player's image to the newly connected viewer
    if (currentPlayerImage) {
      socket.emit('updateViewer', currentPlayerImage);
    }

    // Admin sends image updates
    socket.on('updateViewer', (image) => {
      currentPlayerImage = image; // Update the global image
      io.emit('updateViewer', image); // Broadcast to all viewers
    });

    // Handle disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected from WebSocket:', socket.id);
    });
  });

  return io; // Return the io instance if needed
};

module.exports = setupWebSocket;
