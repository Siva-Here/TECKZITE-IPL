import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  FaFlag,
  FaBaseballBall,
  FaCalendarAlt,
  FaChartLine,
  FaDollarSign,
  FaPauseCircle,
  FaHourglassStart,
} from 'react-icons/fa';
import ConfettiComponent from './ConfettiComponent';
import SoldSVG from './SoldSVG';
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


const TeamsContainer = styled.div`
  position: relative;
  min-height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Enable scrolling */
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: fixed; /* Fixed position for background */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Full viewport height */
    background-image: url('/bg.jpg'); /* Update the path if needed */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1; /* Place the background behind content */
    opacity: 0.2; /* Semi-transparent background */
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
  color: white;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #1f1f1f, rgba(31, 31, 31, 0.5), transparent);
`;



const SoldOverlay = styled.div`
  position: fixed; /* Always fixed */
  top: 50%;
  left: 0;
  width: 100%;
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  align-items: center; /* Center content */
  z-index: 9999; /* High priority over other elements */
  pointer-events: none; /* Prevent interaction with other elements */
`;


const socket = io(`${Backend_Url}`);

const HomePage = () => {
  const [player, setPlayer] = useState({});
  const [amount, setAmount] = useState('');
  const [auctionstatus, setAuctionStatus] = useState(false);
  const [popper, setPopper] = useState(false);
  const [team,setTeam]=useState(null);
  const [start,setStart]=useState(false)
  useEffect(() => {
    // Listen for updates from the server
    const handleUpdateViewer = (newImage) => {
      console.log('Image received:', newImage);
      setPlayer(newImage); // Update player state
      setAmount(newImage.basePrice.toLocaleString());
      setAuctionStatus(false);
    };

    const handleBidAmount = (bidAmount) => {
      console.log('Bid amount received:', bidAmount);
      setAmount(bidAmount); // Update amount state
    };

    const handlepause = (status) => {
     
      setAuctionStatus(status);
    };

    const handleConfirmBid = (status,team) => {
     
      // alert(team)
      setPopper(status);
      setTeam(team)
    };
     const handleauctionstart=(message)=>{
      // alert(message)
       setStart(message)
     }
    // Attach socket listeners
    socket.on('updateViewer', handleUpdateViewer);
    socket.on('bidAmount', handleBidAmount);
    socket.on('pauseAuction', handlepause);
    socket.emit('requestData');
    socket.on('bidConfirmed', handleConfirmBid);
    socket.on('started',handleauctionstart)
    // Cleanup listeners on component unmount
    return () => {
      socket.off('updateViewer', handleUpdateViewer);
      socket.off('bidAmount', handleBidAmount);
      socket.off('pauseAuction', handlepause);
      socket.off('bidConfirmed', handleConfirmBid);
      socket.off('started',handleauctionstart)
    };
  }, []);

  return (
    <>
     {popper && (
              <SoldOverlay>
                <SoldSVG name={player.name} team={team} color={team ? "#38ad34": "red"}/>
              </SoldOverlay>
            )}
      {player ? (
        <div className="bg-gradient-to-br from-cyan-900 via-black to-gray-900 text-cyan-300 min-h-screen flex flex-col">
          <div className="flex flex-col md:flex-row flex-1 h-screen">
            {popper && team && <ConfettiComponent />}

            {/* SoldSVG Overlay */}
           

            <div className="relative w-full h-1/2 md:h-full md:w-1/2">
              <img
                alt="A placeholder image of a cricket player in action"
                className="w-full h-full object-cover object-top"
                height="400"
                src={player.image}
                width="600"
              />
              <GradientOverlay />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center space-x-3 text-gray-200">
                    <FaFlag className="w-5 h-5 text-cyan-300" />
                    <span className="text-lg">{player.nationality}</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {player.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 text-sm md:text-base">
                    <div className="flex items-center">
                      <FaBaseballBall className="w-5 h-5 mr-2 text-cyan-300" />
                      <span className="text-[#fff]">{player.role}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="w-5 h-5 mr-2 text-cyan-300" />
                      <span className="text-[#fff]">{player.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-12 bg-gradient-to-br from-cyan-9000 via-cyan to-gray-9000 ">
              {/* Auction Details and Career Statistics sections */}
              {/* ... (rest of your code) ... */}
              <div className="bg-opacity-80 backdrop-blur-md rounded-xl p-4 md:p-8 mb-8 transition-transform transform border border border-cyan-500/60 hover:scale-105">
                <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <i className="fas fa-dollar-sign w-6 h-6 mr-3 text-cyan-500">
                  </i>
                  <FaDollarSign className="w-6 h-6 mr-3 text-cyan-300" />
                  Auction Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Baseprice
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                      {player.basePrice}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Current bid
                    </span>
                    <div className="text-green-400 md:text-3xl font-bold">
                      {amount?amount:player.basePrice}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                </div>
              </div>
              <div className=" hover:scale-105 bg-opacity-80 backdrop-blur-md rounded-xl p-4 md:p-8 transition-transform transform border border-cyan-500/60">
                <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <i className="fas fa-chart-line w-5 h-5 mr-3 text-cyan-500">
                  </i>
                  <FaChartLine className="w-5 h-5 mr-3 text-cyan-300" />
                  Career Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4  p-4">
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Runs
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                      {player.runs}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Wickets
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                     { player.wickets}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Strike Rate
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                      {player.strikeRate}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      50/100
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                      {player.fiftybyhundred}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Average
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                      {player.average}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                  <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#090A0C] to-[#3155AE] hover:from-[#3155AE] hover:to-[#161929] backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                      {/* <span className="w-4 h-4"><FiUsers /></span> */}
                      Economy
                    </span>
                    <div className="text-2xl md:text-3xl font-bold">
                      {player.economy}
                    </div>

                    {/* Geometric Accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TeamsContainer>
          <Message className="text-center">
            {auctionstatus ? (
              <>
                <span className="text-cyan-300">
                  <FaPauseCircle /> 
                </span>
                Oops.... Auction Paused
              </>
            ) 
            : (
              <>
              {
                !start ? 
                <>
                <span className="text-cyan-300">
                  <FaHourglassStart /> 
                </span>
                Oops !! Auction Not Yet Started.
              </> :
              <>
                <span className="text-cyan-300">
                  <FaPauseCircle /> 
                </span>
                Oops.... Auction Paused
              </>

              }
              </>
            )
             }
          </Message>
        </TeamsContainer>
      )}
    </>
  );
};

export default HomePage;