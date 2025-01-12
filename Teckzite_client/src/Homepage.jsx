// import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000');

// const HomePage = () => {
//   const [image, setImage] = useState('');

//   useEffect(() => {
//     socket.on('updateViewer', (newImage) => {
//       setImage(newImage);
//       console.log(newImage)
//     });

//     return () => {
//       socket.off('updateViewer');
//     };
//   }, []);

//   return (
//     <div className="container mt-5 text-center">
//       {image ? (
//         <img src={image} alt="Current Player" className="img-fluid" />
//       ) : (
//         <p>Waiting for admin to start auction...</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const HomePage = () => {
  const [image, setImage] = useState('');

  useEffect(() => {
    // Listen for updates from the server
    socket.on('updateViewer', (newImage) => {
     console.log(newImage)
      setImage(newImage);
    
      console.log('Image updated:', newImage);
    });

    return () => {
      socket.off('updateViewer');
    };
  }, []);

  return (
    <div className="container mt-5 text-center">
      {image.image ? (
       <div> <img src={image.image} alt="Current Player" className="img-fluid" />
       <p>{image.name}</p>
          </div>
      ) : (
        <p>Waiting for admin to start auction...</p>
      )}
    </div>
  );
};

export default HomePage;
