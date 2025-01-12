

// import AddTeam from './Pages/AddTeam'
// import Login from './Pages/Login'
// import Carousel from './Pages/Carousel';
// import Homepage from './Pages/Homepage';
// const images = [
//   'https://cdn.siasat.com/wp-content/uploads/2020/02/Royal-Challengers-Bangalore.jpg',
//  'https://wallpapercave.com/wp/wp4166466.jpg',
//  'https://th.bing.com/th/id/OIP.Do9YjX3cnThK3R1EiwP7mwHaFj?rs=1&pid=ImgDetMain',
//  'https://th.bing.com/th/id/OIP.8nbexGYH865s1maVpPOf9gHaEK?rs=1&pid=ImgDetMain',
//  'https://play-lh.googleusercontent.com/zJo5zcc3EF4DmdMDMj4CTqppNa5XyRFvw6t0ZFE-ucmPS5qBRcughNUTOCJoH-wnbQ',
// ];
// =======
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Authcontext';
import Navbar from './Pages/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AddPlayer from './Pages/AddPlayer';
import AddTeam from './Pages/AddTeam';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem'}}>
        <Outlet />
      </div>

    </>
  );
};


const App = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Not authenticated. Redirecting to login...');
    } else {
      console.log('Authenticated. Access granted.');
    }
  }, [isAuthenticated]);

//   return (
// <<<<<<< admin_client_home
//     // <Carousel images={images} interval={3000}/>
//     <Homepage/>
//   )
// }
// =======
    <>
    <ToastContainer />

    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<AppLayout />}>
            {/* Nested routes under AppLayout */}
            <Route path="/" element={<Home />} />
            <Route path="/player" element={<AddPlayer />} />
            <Route path="/teams" element={<AddTeam />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
    </>
  );
};

export default App;


