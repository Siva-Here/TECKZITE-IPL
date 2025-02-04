
// const { Server } = require('socket.io');

// const setupWebSocket = (server) => {
//   const io = new Server(server, { cors: { origin: '*' } });
//   let currentPlayerImage = ''; 
//   let currentBidAmount = '';
//   let pause=false;
// let adminSocketId='';

//   io.on('connection', (socket) => {
//     console.log('A user (viewer) connected to WebSocket:', socket.id);

//     socket.on('adminConnected', () => {
//       console.log('Admin connected:', socket.id);
//       adminSocketId = socket.id; // Set the admin socket ID
//     });
//     // Emit current state to the newly connected client
//     if (currentPlayerImage) {
//       socket.emit('updateViewer', currentPlayerImage);
//       console.log("After refreshing:",currentPlayerImage);
//     }

//     if (currentBidAmount) {
//       socket.emit('bidAmount', currentBidAmount);
//     }
//     if(pause){
//       socket.emit('updateViewer',null)
//       socket.emit('pauseAuction',true);
//     }
//     socket.on('requestData', () => {
//       if(pause){
//         socket.emit('updateViewer',null)
//         socket.emit('pauseAuction',true);
//       }else{ 
//       if (currentPlayerImage) {
//         socket.emit('updateViewer', currentPlayerImage);
//       }
//       if (currentBidAmount) {
//         socket.emit('bidAmount', currentBidAmount);
//       }
//     }
//     });
//     // Listen for updates and broadcast to all clients
//     socket.on('updateViewer', (image) => {
//       currentPlayerImage = image;
//       io.emit('updateViewer', image);
//     });

//     socket.on('bidAmount', (amount) => {
//       currentBidAmount = amount;
//       io.emit('bidAmount', amount);
//     });
//   socket.on("pauseAuction",(message)=>{
//     console.log(message)
//     pause=message;
//     if(message){ 
//     io.emit("updateViewer",null)
//     }else{
//       io.emit("updateViewer",currentPlayerImage)
//     }
//     io.emit("pauseAuction",message)
//   })
  
//     // Handle disconnections
//     socket.on('disconnect', () => {
//       console.log('A user disconnected from WebSocket:', socket.id);
//       if (socket.id === adminSocketId) {
//         console.log('Admin disconnected:', socket.id);
//         adminSocketId = null; 
//         currentPlayerImage = ''; 
//         currentBidAmount = '';
//         io.emit('updateViewer',null);
//         io.emit('bidAmount',null);
        
//       }
//     });
//   });
// };

// module.exports = setupWebSocket;

const { Server } = require('socket.io');

const setupWebSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });
  
  let currentPlayerImage = ''; 
  let currentBidAmount = '';
  let pause = false;
  let adminSocketId = '';
let popper=false;
  // Function to emit the current auction state
  const emitCurrentState = (socket) => {
    if (pause) {
      socket.emit('updateViewer', null);
      socket.emit('pauseAuction', true);
    } else {
      socket.emit('updateViewer', currentPlayerImage);
      socket.emit('bidAmount', currentBidAmount);
      if(popper){
        socket.emit('bidConfirmed',true)
      }else{
        socket.emit('bidConfirmed',false)
      }
    }

  };

  io.on('connection', (socket) => {
    console.log('A user (viewer) connected:', socket.id);

    socket.on('adminConnected', () => {
      console.log('Admin connected:', socket.id);
      adminSocketId = socket.id;
    });

    // Send current state to newly connected client
    emitCurrentState(socket);

    socket.on('requestData', () => emitCurrentState(socket));

    // Update and broadcast player image
    socket.on('updateViewer', (image) => {
      currentPlayerImage = image;
      io.emit('updateViewer', image);
    });

    // Update and broadcast bid amount
    socket.on('bidAmount', (amount) => {
      currentBidAmount = amount;
      io.emit('bidAmount', amount);
    });
    socket.on('bidConfirmed',(message)=>{
      popper=message
      console.log("popper",popper)
     io.emit('bidConfirmed',message);
    })
    // Pause auction logic
    socket.on('pauseAuction', (message) => {
      console.log("Auction paused:", message);
      pause = message;
      io.emit('updateViewer', message ? null : currentPlayerImage);
      io.emit('bidAmount',message?null:currentBidAmount);
      io.emit('pauseAuction', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      if (socket.id === adminSocketId) {
        console.log('Admin disconnected:', socket.id);
        adminSocketId = null;
        currentPlayerImage = '';
        currentBidAmount = '';
        io.emit('updateViewer', null);
        io.emit('bidAmount', null);
      }
    });
  });
};

module.exports = setupWebSocket;
