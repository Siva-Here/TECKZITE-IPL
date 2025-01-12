import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './Authcontext';
import Profilecard from './components/Profilecard.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      {/* <Profilecard /> */}
    </AuthProvider>
  </StrictMode>
);
