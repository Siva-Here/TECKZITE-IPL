import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
    color: #0ff;
  }
  50% {
    text-shadow: 0 0 10px #127bab, 0 0 20px #127bab, 0 0 40px #127bab, 0 0 50px #127bab;
    color: #127bab;
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
  animation: ${neonGlow} 3s infinite;
  animation-delay: ${({ delay }) => delay}s;

  &:before {
    content: "";
    position: absolute;
    top: -10px; /* Adjust thread height */
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 10px; /* Adjust thread height */
  }

  @media (max-width: 600px) {
    font-size: 2rem; /* Smaller font size for mobile */

    &:before {
      height: 10px; /* Smaller thread height for mobile */
      top: -10px; /* Adjust top position of thread */
    }
  }
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
  color:black;

  @media (max-width: 600px) {
    height: 20%; /* Adjust height for mobile screens */
    top: 5%; /* Move title closer to the top */
  }
`;

const Navbar = () => {
  const fullTitle = "TeckZiteIplAuction";
  const shortTitle = "TzIplAuction";

  const [title, setTitle] = useState(fullTitle);
  const [topPosition, setTopPosition] = useState('0%');

  const handleResize = () => {
    const isMobile = window.innerWidth <= 600;
    setTitle(isMobile ? shortTitle : fullTitle);
    setTopPosition(isMobile ? '-9%' : '-1%'); // Adjust title top position for mobile
  };

  useEffect(() => {
    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener on unmount
    };
  }, []);

  return (
    <TitleContainer style={{ top: topPosition }}>
      {title.split("").map((char, index) => (
        <Letter key={index} delay={index * 0.2}>
          {char}
        </Letter>
      ))}
    </TitleContainer>
  );
};

export default Navbar;
