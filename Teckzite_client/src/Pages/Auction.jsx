import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  FaFlag,
  FaBaseballBall,
  FaCalendarAlt,
  FaChartLine,
  FaDollarSign,
  
} from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1f1f1f, #000);
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    min-height: 100vh;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;

  @media (min-width: 768px) {
    height: auto;
    width: 50%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #1f1f1f, rgba(31, 31, 31, 0.5), transparent);
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const HeroText = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: clamp(2rem, 4vw, 4rem);
  }

  @media (min-width: 1024px) {
    font-size: clamp(2.5rem, 3vw, 5rem);
  }
`;

const HeroSubText = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: #d1d1d1;

  @media (min-width: 768px) {
    gap: 1rem;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
  }
`;

const MainContent = styled.div`
  width: 100%;
  padding: 1rem;

  @media (min-width: 768px) {
    width: 50%;
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const Card = styled.div`
  background: rgba(31, 31, 31, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(31, 31, 31, 0.9);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    transform: scale(1.03);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardItem = styled.div`
  background: rgba(90, 65, 91, 0.7);
  border-radius: 0.75rem;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardItemTitle = styled.div`
  color: #d1d1d1;
  margin-bottom: 0.5rem;
`;

const CardItemValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;




const socket = io('http://localhost:8000');

const HomePage = () => {
  const [player, setPlayer] = useState('');

  useEffect(() => {
    // Listen for updates from the server
    socket.on('updateViewer', (newImage) => {
     console.log(newImage)
      setPlayer(newImage);
    
      console.log('Image updated:', newImage);
    });

    return () => {
      socket.off('updateViewer');
    };
  }, []);

  return (
    <Container>
    <HeroSection>
      
        {player ? (
          <>
          <ImageContainer>
            <Image src={player.image} alt={player.name} />
            <GradientOverlay />
            <HeroContent>
              <HeroText>
                <div className="flex items-center space-x-3 text-gray-200 mb-2">
                  <FaFlag className="w-5 h-5 text-[#ff00ff]" />
                  <span className="text-lg">Team India</span>
                </div>
                <HeroTitle>{player.name}</HeroTitle>
                <HeroSubText>
                  <div className="flex items-center">
                    <FaBaseballBall className="w-5 h-5 mr-2 text-[#ff00ff]" />
                    <span>{player.role}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="w-5 h-5 mr-2 text-[#ff00ff]" />
                    <span>{player.age}</span>
                  </div>
                </HeroSubText>
              </HeroText>
            </HeroContent>
           </ImageContainer>
           <MainContent>
            <Card>
              <CardTitle>
                 <FaChartLine className="w-5 h-5 mr-3 text-[#ff00ff]" />
                              Career Statistics
                            </CardTitle>
                            <CardGrid>
          <CardItem>
            <CardItemTitle>Runs</CardItemTitle>
            <CardItemValue>{player.runs}</CardItemValue>
          </CardItem>
          <CardItem>
            <CardItemTitle>Wickets</CardItemTitle>
            <CardItemValue>{player.wickets}</CardItemValue>
            </CardItem>
            <CardItem>
            <CardItemTitle>Strike Rate</CardItemTitle>
            <CardItemValue>{player.strikeRate}</CardItemValue>
          </CardItem>
          <CardItem>
            <CardItemTitle>Debut</CardItemTitle>
            <CardItemValue>{player.
            isDebut}</CardItemValue>
          </CardItem>
          </CardGrid>
          </Card>
          <Card>
          <CardTitle>
<FaDollarSign className="w-6 h-6 mr-3 text-[#ff00ff]" />
            Auction Details
          </CardTitle>
            <CardGrid>
 
          <CardItem>
            <CardItemTitle>BasePrice</CardItemTitle>
            <CardItemValue>{player.basePrice.toLocaleString()}</CardItemValue>
          </CardItem>
          <CardItem>
            <CardItemTitle>Current Bid</CardItemTitle>
            <CardItemValue style={{ color: 'green' }}>{bidAmount}</CardItemValue>
          </CardItem>
          </CardGrid>
         
   </Card>
   </MainContent>
   </>

  ):(
    <p>No players available</p>
  )
}
</HeroSection>
</Container>
  )
};

export default HomePage;
