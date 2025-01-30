import { Canvas } from "@react-three/fiber";
import  { useState, useEffect, Suspense } from "react";
import styled, { keyframes } from "styled-components";
import ParticleField from "../components/ParticleField";
import { OrbitControls } from "@react-three/drei";
import Navbar from "../components/Navbar";

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

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 100%;
  height: 15%; /* Adjusted title container height */
  z-index: 1;
  transition: top 0.3s ease;

  @media (max-width: 600px) {
    height: 20%; /* Adjust height for mobile screens */
    top: 5%; /* Move title closer to the top */
  }
`;

const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #0ff;
    color: #000;
  }
  25%,50%{
    text-shadow: 0 0 20px rgb(20, 76, 100), 0 0 40px rgb(20, 76, 100), 0 0 80px rgb(20, 76, 100) 0 0 100px rgb(20, 76, 100);
    color: rgb(20, 76, 100);
  }
`;

const swingAnimation = keyframes`
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
`;

const Letter = styled.div`
  position: relative;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
 animation: ${neonGlow} 2s infinite, ${swingAnimation} 7s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;

  &:before {
    content: "";
    position: absolute;
    top: -50px; /* Reduced thread height */
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 50px; /* Reduced thread height */
    background: linear-gradient(to bottom, #0ff, transparent);
  }

  @media (max-width: 600px) {
    font-size: 2rem; /* Smaller font size for mobile */

    &:before {
      height: 30px; /* Smaller thread height for mobile */
      top: -30px; /* Adjust top position of thread */
    }
  }
`;

const Home = () => {
  const fullTitle = "TeckZiteiplAuction";
  const shortTitle = "TziplAuction";

  const [title, setTitle] = useState(fullTitle);
  const [topPosition, setTopPosition] = useState('0%');

  const handleResize = () => {
    const isMobile = window.innerWidth <= 600;
    setTitle(isMobile ? shortTitle : fullTitle);
    setTopPosition(isMobile ? '-9%' : '0%');
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
      {/* <TitleContainer style={{ top: topPosition }}>
        {title.split("").map((char, index) => (
          <Letter key={index} delay={index * 0.2}>
            {char}
          </Letter>
        ))}
      </TitleContainer> */}
      {/* <Navbar /> */}
    </Container>
  );
};

export default Home;
