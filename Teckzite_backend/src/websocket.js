const { Server } = require('socket.io');

const setupWebSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });
  let currentPlayerImage = ''; 
let bidAmount=''
  io.on('connection', (socket) => {
    console.log('A user (viewer) connected to WebSocket:', socket.id);

    if (currentPlayerImage) {
      socket.emit('updateViewer', currentPlayerImage);
      console.log("After refreshing:",currentPlayerImage);
    }
    else{
      console.log("No image to send");
    }
    if(bidAmount){
      socket.emit('bidAmount',bidAmount);
    }
    socket.on('updateViewer', (image) => {
      currentPlayerImage = image;
      io.emit('updateViewer', image);
    });
     socket.on('bidAmount',(bidAmount)=>{
      bidAmount=bidAmount;
      io.emit('bidAmount',bidAmount);
     })
    // Handle disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected from WebSocket:', socket.id);
    });
  });

  // return io;
};

module.exports = setupWebSocket;
