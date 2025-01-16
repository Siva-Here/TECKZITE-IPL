// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './Authcontext';
// import Navbar from './Pages/Navbar';
// import Login from './Pages/Login';
// import Home from './Pages/Home';
// import AddPlayer from './Pages/AddPlayer';
// import AddTeam from './Pages/AddTeam';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Auction from './Pages/Auction';


// const AppLayout = () => {
//   return (
//     <>
//     <div>
//     <Navbar  />
//     </div>
//       <div>
//         <Outlet />
//       </div>
//     </>
//   );
// };

// const App = () => {
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       console.log('Not authenticated. Redirecting to login...');
//     } else {
//       console.log('Authenticated. Access granted.');
//     }
//   }, [isAuthenticated]);

//   return (
//     <>
//       <ToastContainer />

//       <Router>
//         <Routes>
//           {/* Public Route */}
//           <Route
//             path="/login"
//             element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
//           />

//           {/* Protected Routes */}
//           {isAuthenticated ? (
//             <Route element={<AppLayout />}>
//               <Route path="/" element={ <Home />} />
//               <Route path="/player" element={<AddPlayer />} />
//               <Route path="/teams" element={<AddTeam />} />
//               <Route path="/auction" element={<Auction />} />
//             </Route>
//           ) : (
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           )}
//         </Routes>
//       </Router>
      
//     </>
//   );
// };

// export default App;



import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Authcontext';
import Navbar from './Pages/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AddPlayer from './Pages/AddPlayer';
import AddTeam from './Pages/AddTeam';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auction from './Pages/Auction';

const AppLayout = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
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

  // Before redirecting to the login page, save the current URL


  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={ '/'} replace />
              ) : (
                <Login />
              )
            }
          />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/player" element={<AddPlayer />} />
              <Route path="/teams" element={<AddTeam />} />
              <Route path="/auction" element={<Auction />} />
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

