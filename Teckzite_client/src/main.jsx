import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'; 
import Playercard from './components/Playercard.jsx'
import Players from './Pages/Players.jsx'
import CyberCard from './components/Teamcard.jsx'
import Teamplayers from './Pages/Teamplayers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
