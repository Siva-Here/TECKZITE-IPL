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
const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  width: 10rem;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }

  @media (max-width: 768px) {
    width: 8rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    width: 6rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    top: 2px;
    right: 0;
  }
`;



import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Modal } from "react-bootstrap";
const socket = io('http://localhost:8000');

const HomePage = () => {
  const [player, setPlayer] = useState(null); // Current player data
  const [bidAmount, setBidAmount] = useState(0); // Current bid amount
  const [selectedTeam, setSelectedTeam] = useState(''); // Selected team for the bid
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(true);
  const [selectedRole,setSelectedRole]=useState('')
  // Fetch the current player on component load
  // useEffect(() => {
  //   fetchPlayer();
  // }, []);
  const token = localStorage.getItem("Token");
  const fetchPlayer = (role,bidplace = null, direction, set) => {
    console.log(set)
    console.log(player)
    setShowModal2(false)
    console.log("Role in fetch players:",role);
    const url = bidplace
      ? `http://localhost:8000/api/playersToBuy?role=${role}&bidplace=${bidplace}&set=${set}&direction=${direction}`
      : `http://localhost:8000/api/playersToBuy?role=${role}`;
    

    axios
      .get(url)
      .then((response) => {
        if (response.data && typeof response.data === 'object') {
          setPlayer(response.data);

          setBidAmount(response.data.basePrice || 0);
          setSelectedTeam('');
          socket.emit('updateViewer', response.data);
        } else {
          setPlayer(null);
          socket.emit('updateViewer', null)
        }
      })
      .catch((err) => {
        console.error('Error fetching player:', err);
      });
  };

  const handleNext = () => {

    if (player?.set && player?.bidplace) {
      fetchPlayer(selectedRole,player.bidplace, "next", player.set);
    } else {
      fetchPlayer(selectedRole);
    }
  };

  const handlePrev = () => {
    if (player?.bidplace && player.bidplace > 1 && player?.set) {
      fetchPlayer(selectedRole,player.bidplace, "prev", player.set);
    }
    else {
      fetchPlayer(selectedRole)
    }
  };

  const handleIncreaseBid = () => {

    if (player) {
      const increment = player.basePrice >= 10000000 ? 1000000 : 10000;
      setBidAmount((prev) => prev + increment);
      socket.emit('bidAmount', bidAmount + increment);
    }
  };

  const handleDecreaseBid = () => {
    if (player) {
      const decrement = player.basePrice >= 10000000 ? 1000000 : 10000;
      setBidAmount((prev) => Math.max(player.basePrice, prev - decrement));
      socket.emit('bidAmount', Math.max(player.basePrice, bidAmount - decrement));
    }
  };
  const handleAssignClick = () => {
    setShowModal(true); // Open the modal
  };

  const handleConfirmSelection = (selectedTeam) => {
    console.log(selectedTeam)
    if (selectedTeam == "") {
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

         // fetchPlayer(player.bidplace, "next", player.set);
           setShowModal2(true);
        })
        .catch((error) => {
          console.error('Error confirming bid:', error);

          if (error.response && error.response.data && error.response.data.error) {
            // Backend-specific error
            toast.error(error.response.data.error);
          } else {
            // Generic or network error
            toast.error("An unexpected error occurred while confirming the bid.");
          }
        });
    } else {
      alert("No player selected to bid.");
    }
  };

const chooseRole=(role)=>{
console.log("role",role)
setSelectedRole(role)
fetchPlayer(role);
}


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
                      {["RCB", "MI", "CSK", "KKR", "DC", "GT", "LSG", "KXIP", "RR", "SRH"].map((team, i) => (
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
                    <Button variant="primary" onClick={() => handleConfirmSelection(selectedTeam)}>
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
        </ButtonGroup >}
      </HeroSection>
      {showModal2 ? (
        <div
          style={{
            height: "100vh",
            backgroundColor: "rgb(37, 44, 59)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column", // Use column for mobile-first approach
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              maxWidth: "500px",
            }}
          >
            {["batsman", "bowler", "Allrounder", "Wicketkeeper"].map((role, index) => (
              <div
                key={index}
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%", // Make buttons full width on mobile
                }}
              >
                <NeonButton onClick={()=>chooseRole(role)}>{role}</NeonButton>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}


    </Container>

  );
}
export default HomePage;





