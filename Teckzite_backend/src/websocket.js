// const { Server } = require('socket.io');

// const setupWebSocket = (server) => {
//   const io = new Server(server, { cors: { origin: '*' } });
//   let currentPlayerImage = ''; 
// let bidAmount=''
//   io.on('connection', (socket) => {
//     console.log('A user (viewer) connected to WebSocket:', socket.id);

//     if (currentPlayerImage) {
//       socket.emit('updateViewer', currentPlayerImage);
//     }
//     if(bidAmount){
//       socket.emit('bidAmount',bidAmount);
//     }
//     socket.on('updateViewer', (image) => {
//       currentPlayerImage = image;
//       io.emit('updateViewer', image);
//     });
//      socket.on('bidAmount',(bidAmount)=>{
//       bidAmount=bidAmount;
//       io.emit('bidAmount',bidAmount);
//      })
//     // Handle disconnects
//     socket.on('disconnect', () => {
//       console.log('A user disconnected from WebSocket:', socket.id);
//     });
//   });

//   //  return io;
// };

// module.exports = setupWebSocket;
const { Server } = require('socket.io');

const setupWebSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });
  let currentPlayerImage = ''; 
  let currentBidAmount = ''; // Rename to avoid shadowing
let adminSocketId='';
  io.on('connection', (socket) => {
    console.log('A user (viewer) connected to WebSocket:', socket.id);

    socket.on('adminConnected', () => {
      console.log('Admin connected:', socket.id);
      adminSocketId = socket.id; // Set the admin socket ID
    });
    // Emit current state to the newly connected client
    if (currentPlayerImage) {
      socket.emit('updateViewer', currentPlayerImage);
    }

    if (currentBidAmount) {
      socket.emit('bidAmount', currentBidAmount);
    }
    socket.on('requestData', () => {
      if (currentPlayerImage) {
        socket.emit('updateViewer', currentPlayerImage);
      }
      if (currentBidAmount) {
        socket.emit('bidAmount', currentBidAmount);
      }
    });
    // Listen for updates and broadcast to all clients
    socket.on('updateViewer', (image) => {
      currentPlayerImage = image;
      io.emit('updateViewer', image);
    });

    socket.on('bidAmount', (amount) => {
      currentBidAmount = amount;
      io.emit('bidAmount', amount);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected from WebSocket:', socket.id);
      if (socket.id === adminSocketId) {
        console.log('Admin disconnected:', socket.id);
        adminSocketId = null; 
        currentPlayerImage = ''; 
        currentBidAmount = '';
        io.emit('updateViewer',null);
        io.emit('bidAmount',null)
      }
    });
  });
};

module.exports = setupWebSocket;

