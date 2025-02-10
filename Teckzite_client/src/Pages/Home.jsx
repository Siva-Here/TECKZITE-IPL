import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import styled from "styled-components";
import ParticleField from "../components/ParticleField";
import { OrbitControls } from "@react-three/drei";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {toast} from "react-toastify";
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0.5;
  opacity: 0.3;
`;


const Home = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/auction");
  }
  const [playerData, setPlayerData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Url}/api/playerinfo`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPlayerData(data);
    } catch (error) {
      toast.error('Error fetching player data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>

      <div className="absolute inset-0 bg-repeat">
        <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <spotLight
              position={[-5, 5, 0]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <ParticleField isDarkMode={true} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      <BackgroundVideo autoPlay loop muted>
        <source src="promo.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      <div className="bg-gray-1200 text-white flex flex-col items-center min-h-[80vh]">
        <style>
          {`
      .static-border {
        position: relative;
        border: 2px solid rgba(59, 130, 246, 0.5);
        border-radius: 0.5rem;
        background: transparent;
        transition: all 0.3s ease;

      }

      .static-border:hover {
        border-color: rgba(59, 130, 246, 1);
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        transform: translateY(-5px);
      }

      .static-border > div {
        position: relative;
        z-index: 1;
        background: transparent;
        border-radius: 0.5rem;
        padding: 1.5rem;
      }
    `}
        </style>

        {/* Logo Positioned at the Top Center */}
        <div className="w-full flex justify-center py-4">
          <img src="log0.png" alt="" style={{ width: "700px", height: "150px", marginRight: "15px" }} />
        </div>

        {/* Content Centered in 80vh */}
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl px-4">
          {/* Total Players Card */}
          <div className="static-border w-full slide-in-top">
            <div className="backdrop-blur-md rounded-lg p-4 text-center">
              <h2 className="text-l font-bold mb-2 text-cyan-300">Total Players</h2>
              <p className="text-2xl font-bold text-cyan-300">{playerData.totalPlayers}</p>
            </div>
          </div>

          {/* Sold and Unsold Players Cards */}
          <div className="grid grid-cols-2 gap-8 mt-6">
            <div className="static-border slide-in-left">
              <div className="backdrop-blur-md rounded-lg p-6 text-center">
                <h2 className="text-l font-bold mb-4 text-cyan-300">Sold Players</h2>
                <p className="text-2xl font-bold text-cyan-300">{playerData.totalSoldPlayers}</p>
              </div>
            </div>
            <div className="static-border slide-in-right">
              <div className="backdrop-blur-md rounded-lg p-6 text-center">
                <h2 className="text-l font-bold mb-4 text-cyan-300">Unsold Players</h2>
                <p className="text-2xl font-bold text-cyan-300">{playerData.totalUnsoldPlayers}</p>
              </div>
            </div>
          </div>

          {/* Live Auction Button */}
          <div className="mt-8 static-border">
            <button className="backdrop-blur-md cursor text-cyan-300 font-bold py-2 px-4 rounded-full" onClick={handleClick}>
              Live Auction
            </button>
          </div>
        </div>
      </div>

    </Container>
  );
};

export default Home;


