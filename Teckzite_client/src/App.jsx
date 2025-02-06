import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation} from 'react-router-dom';
import { FaHome, FaUsers, FaUserCircle, FaRegPlayCircle } from 'react-icons/fa';
import Home from './Pages/Home';
import Teams from './Pages/Teams';
import Players from './Pages/Players';
import HomePage from './Homepage';
import Teamplayers from './Pages/Teamplayers';

function Layout() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts.pop();

    setSelectedIcon(lastPart || 'home'); // Default to 'home' if path is empty
  }, [location]);

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home', path: '/' },
    { id: 'auction', icon: FaRegPlayCircle, label: 'Auction', path: '/auction' },
    { id: 'teams', icon: FaUsers, label: 'Teams', path: '/teams' },
    { id: 'players', icon: FaUserCircle, label: 'Players', path: '/players' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div>
        <main>
          <Outlet />
        </main>
        <nav
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-10 md:px-12 py-4 rounded-full 
  backdrop-blur-md bg-black/30 border border-cyan-500/30 shadow-md shadow-cyan-500/20"
        >
          <ul className="flex space-x-8">
            {navItems.map(({ id, icon: Icon, label, path }) => (
              <li key={id} className="relative group">
                <Link to={path} className="flex flex-col items-center">
                  <div
                    className={`mb-1 transform transition-all duration-300 translate-y-[-6px] ${selectedIcon === id ? 'translate-y-[-12px]' : ''}`}
                  >
                    <Icon
                      className={`w-5 h-5 ${selectedIcon === id
                        ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                        : 'text-gray-400 hover:text-cyan-300'
                        }`}
                    />
                  </div>
                  <span
                    className={`absolute bottom-[-8px] text-xs text-center transition-all duration-300 mt-[5px] ${selectedIcon === id
                      ? 'opacity-100 visible text-cyan-400'
                      : 'opacity-30 visible text-gray-400'
                      }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="players" element={<Players />} />
          <Route path="auction" element={<HomePage />} />
          <Route path="teams/:id" element={<Teamplayers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
