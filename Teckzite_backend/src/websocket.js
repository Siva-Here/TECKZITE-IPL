const { Server } = require('socket.io');

const setupWebSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });
  
  let currentPlayerImage = ''; 
  let currentBidAmount = '';
  let pause = false;
  let adminSocketId = '';
  let adminConnected=false
let popper=false;
  // Function to emit the current auction state
  const emitCurrentState = (socket) => {
    console.log("pause",pause,"currentplayer",currentPlayerImage)
    if (pause) {
      socket.emit('updateViewer', null);
      socket.emit('pauseAuction', true);
    } else {
      socket.emit('updateViewer', currentPlayerImage);
      socket.emit('bidAmount', currentBidAmount);
      if(popper){
        socket.emit('bidConfirmed',true,team)
      }else{
        socket.emit('bidConfirmed',false,null)
      }
      if(adminSocketId || adminConnected)
      socket.emit('started',true)
    }

  };

  io.on('connection', (socket) => {
    console.log('A user (viewer) connected:', socket.id);
    
    socket.on('adminConnected', () => {
      console.log('Admin connected:', socket.id);
      adminSocketId = socket.id;
      socket.emit("started",true);
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
    socket.on('bidConfirmed',(message,team)=>{
      popper=message
      console.log("popper",popper,team)
     io.emit('bidConfirmed',message,team);
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
        adminConnected=true;
        io.emit('updateViewer', null);
        io.emit('bidAmount', null);
        io.emit("started",true);
      }
    });
  });
};

module.exports = setupWebSocket;
