import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
  FaFlag,
  FaBaseballBall,
  FaCalendarAlt,
  FaChartLine,
  FaDollarSign,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

const Container = styled.div`
  height: 88vh;
  background: linear-gradient(to bottom right, #1f1f1f, #000);
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    height: 88vh;
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
  height: 88vh;

  @media (min-width: 768px) {
    height: 88vh;
    width: 50%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 88vh;
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
  height:88vh;

  @media (min-width: 768px) {
    width: 50%;
    padding: 1rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem;
  }
`;

const Card = styled.div`
  background: rgba(31, 31, 31, 0.8);
  backdrop-filter: blur(10px);
  padding: 0px;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  height:32vh;

  &:hover {
    background: rgba(31, 31, 31, 0.9);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    transform: scale(1.03);
  }
`;

const CardTitle = styled.h2`
  font-size: 0rem;
  font-weight: bold;
  margin-top: 2rem;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 0.8rem;
    padding:10px
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardItem = styled.div`
  background: rgba(90, 65, 91, 0.7);
  border-radius: 0.75rem;
  padding: 0.4rem;
  height:auto;

  @media (min-width: 768px) {
    padding: 0.4rem;
  }
`;

const CardItemTitle = styled.div`
  color: #d1d1d1;
  margin-bottom: 0.2rem;
`;

const CardItemValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const Button = styled.button`
  flex: 1;
  background: #ff00ff;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;

  &:hover {
    background: #d600d6;
    transform: scale(1);
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
  }
`;

const AssignButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;

`;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './Homepagecss.css';
import { Modal} from "react-bootstrap";
const socket = io('http://localhost:8000');

const HomePage = () => {
  const [player, setPlayer] = useState(null); // Current player data
  const [bidAmount, setBidAmount] = useState(0); // Current bid amount
  const [selectedTeam, setSelectedTeam] = useState(''); // Selected team for the bid
  const [showModal, setShowModal] = useState(false);
  // Fetch the current player on component load
  useEffect(() => {
    fetchPlayer();
  }, []);
  const token=localStorage.getItem("Token");
  const fetchPlayer = (bidplace = null,direction,set) => {
 console.log(set)
 console.log(player)
    const url = bidplace
      ? `http://localhost:8000/api/playersToBuy?bidplace=${bidplace}&set=${set}&direction=${direction}`
      : 'http://localhost:8000/api/playersToBuy';

    axios
      .get(url)
      .then((response) => {
        if (response.data && typeof response.data === 'object') {
          setPlayer(response.data);
          // Update player state
          setBidAmount(response.data.basePrice || 0); // Initialize bid amount
          setSelectedTeam(''); // Reset selected team
          socket.emit('updateViewer', response.data); // Broadcast the player's image
        } else {
          setPlayer(null); // Handle case where no player is returned
        }
      })
      .catch((err) => {
        console.error('Error fetching player:', err);
      });
  };

  const handleNext = () => {
    if ( player?.set && player?.bidplace) {
      fetchPlayer(player.bidplace ,"next",player.set); // Fetch the next player based on current bidPlace
    }else{
      fetchPlayer();
    }
  };

  const handlePrev = () => {
    if (player?.bidplace && player.bidplace > 1 && player?.set) {
      fetchPlayer(player.bidplace ,"prev",player.set); // Fetch the previous player based on current bidPlace
    }
    else{
      fetchPlayer()
    }
  };

  const handleIncreaseBid = () => {
   
    if (player) {
      const increment = player.basePrice >= 10000000 ? 1000000 : 10000;
      setBidAmount((prev) => prev + increment);
    }
  };

  const handleDecreaseBid = () => {
    if (player) {
      const decrement = player.basePrice >= 10000000 ? 1000000 : 10000;
      setBidAmount((prev) => Math.max(player.basePrice, prev - decrement));
    }
  };
  const handleAssignClick = () => {
    setShowModal(true); // Open the modal
  };

  const handleConfirmSelection = (selectedTeam) => {
console.log(selectedTeam)
if(selectedTeam==""){
  toast.error("please select team");
  return;
}
    setShowModal(false); // Close the modal
    handleConfirmBid(); // Call the confirm bid handler
  };
 
  const handleConfirmBid = () => {
   
    if (player) {
      axios
        .post(
          'http://localhost:8000/api/bid',
          {
            playerId: player._id,
            biddingAmount: bidAmount,
            teamName: selectedTeam,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          alert('Bid confirmed!');
          fetchPlayer(player.bidplace, "next",player.set); 
        })
        .catch((error) => {
          console.error('Error confirming bid:', error);
          toast.error("Error while confirming bid");
        });
    } else {
      alert("No player selected to bid.");
    }
  };
  

 
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
                     <FaChartLine className=" mr-1  text-[#ff00ff]" />
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
   <FaDollarSign className="mr-1 text-[#ff00ff]" />
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
               <ButtonGroup>
                            <Button onClick={handleDecreaseBid}>
                              <FaMinus />
                            </Button>
                            <Button onClick={handleIncreaseBid}>
                              <FaPlus />
                            </Button>
                            <Button onClick={handleNext}>
                              Unsold
                            </Button>
                            <Button onClick={handlePrev}>
                              <FaArrowLeft />
                            </Button>
                            <Button onClick={handleNext}>
                              <FaArrowRight />
                            </Button>
                            </ButtonGroup>
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            
          >
            <option value="">Select Team</option>
            {["RCB", "MI", "CSK", "KKR", "DC", "GT", "LSG", "KXIP", "RR","SRH"].map((team, i) => (
              <option key={i} value={`${team}`}>
                {team}
              </option>
              
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleConfirmSelection(selectedTeam)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
                          
                          <AssignButton onClick={handleAssignClick}>Assign to Team</AssignButton>
                </Card>
               </MainContent>
              </>
               
            ) : <ButtonGroup>
              <Card><p>No palyers available</p></Card>
           
            {/* <Button onClick={handlePrev}>
              <FaArrowLeft />
            </Button>
            <Button onClick={handleNext}>
              <FaArrowRight />
            </Button> */}
          </ButtonGroup > }
        </HeroSection>
      </Container>
    );
  }
  export default HomePage;
    
        



