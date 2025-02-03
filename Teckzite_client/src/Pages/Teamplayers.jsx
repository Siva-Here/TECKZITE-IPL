// import { useState, useEffect } from 'react';
// import { FaFlag, FaUser } from 'react-icons/fa';
// import { PiCricketBold } from 'react-icons/pi';
// import styled from 'styled-components';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router-dom';

// const TeamsContainer = styled.div`
//   position: relative;
//   min-height: 100vh;
//   overflow-y: auto;

//   &::before {
//     content: '';
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-image: url('/bg.jpg');
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     z-index: 1;
//     opacity: 0.2;
//   }
// `;

// const Content = styled.div`
//   position: relative;
//   z-index: 1;
//   color: white;
//   text-align: center;
//   padding: 20px;
// `;



// const PlayerCard = styled.div`
//   flex: none;
//   width: 300px;
//   margin-right: 20px;
//   background: transparent;
//   border: 1px solid rgba(0, 255, 255, 0.3);
//   border-radius: 10px;
//   overflow: hidden;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
//   }

//   @media (max-width: 768px) {
//     width: 300px;
//   }
// `;

// const Players = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [playersData, setPlayersData] = useState([]);
//   const [filteredPlayers, setFilteredPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();

//   const fetchPlayers = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/getteamplayers/${id}`);
//       const data = await response.json();
//       if (response.ok) {
//         setPlayersData(data);

//         setFilteredPlayers(data); // Initial data for filtered players
//         setLoading(false);
//       } else {
//         toast.error('Error fetching players data');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlayers();
//   }, [id]);

//   const handleChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query === '') {
//       setFilteredPlayers(playersData);
//     } else {
//       const filtered = playersData.filter((player) =>
//         player.name.toLowerCase().includes(query)
//       );
//       setPlayersData(filtered);
//     }
//   };

//   return (
//         <TeamsContainer>
//           <Content>
//             <div className="min-h-screen text-white">
//               {/* <Navbar /> */}
//               <div className="p-6">
//                 <div className="flex justify-center mb-8">
//                   <input
//                     type="text"
//                     placeholder="Search for players..."
//                     value={searchQuery}
//                     onChange={handleChange}
//                     className="bg-[#161929] text-cyan-400 px-4 py-2 rounded-lg w-full md:w-1/2 outline-none shadow-[0_0_10px_rgba(0,255,255,0.5)] focus:shadow-[0_0_10px_rgba(0,255,255,0.8)]"
//                   />
//                 </div>
//                 <div className="flex flex-wrap justify-center gap-6">
//                   {playersData.length > 0 ? (
//                     playersData.map((player, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-center"
//                         style={{ minWidth: '350px', minHeight: '300px' }}
//                       >
//                         <div
//                           className={`bg-transparent border rounded-lg overflow-hidden shadow-md hover:bg-[#161929] cursor-pointer transition-colors duration-300 ease-in-out ${
//                             player.isSold
//                               ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] border-cyan-100'
//                               : 'shadow-[0_0_10px_rgba(239,68,68,0.2)] border-red-100'
//                           }`}
//                         >
//                           <div className="relative rounded-lg">
//                             <div className="relative">
//                               <div className="w-24 h-24 mx-auto mt-4 rounded-full overflow-hidden border-2 border-cyan-500/30">
//                                 <img
//                                   src={player.image}
//                                   alt={`Image of ${player.name}`}
//                                   className="w-full h-full object-cover"
//                                 />
//                               </div>
//                               <div className="absolute top-3 right-3 bg-gray-900/70 px-2 py-1 rounded-full flex items-center space-x-1">
//                                 <FaFlag className="text-cyan-500 w-3 h-3" />
//                                 <span className="text-xs text-white">
//                                   {player.nationality}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="p-4 space-y-3">
//                               <div className="text-center">
//                                 <h2 className="text-lg font-bold text-cyan-400">
//                                   {player.name}
//                                 </h2>
//                                 <div className="flex justify-center space-x-2 text-gray-400 text-xs">
//                                   <div className="flex items-center">
//                                     <FaUser className="text-cyan-500 w-3 h-3" />
//                                     <span className="ml-1">
//                                       {player.age} years
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center">
//                                     <PiCricketBold className="text-cyan-500 w-3 h-3" />
//                                     <span className="ml-1">{player.role}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="grid grid-cols-3 gap-2">
//                                 <div className="bg-[#232533] p-2 rounded-lg">
//                                   <p className="text-gray-400 text-xs">Runs</p>
//                                   <p className="text-sm font-bold text-cyan-400">
//                                     {player.runs}
//                                   </p>
//                                 </div>
//                                 <div className="bg-[#232533] p-2 rounded-lg">
//                                   <p className="text-gray-400 text-xs">Wickets</p>
//                                   <p className="text-sm font-bold text-cyan-400">
//                                     {player.wickets}
//                                   </p>
//                                 </div>
//                                 <div className="bg-[#232533] p-2 rounded-lg">
//                                   <p className="text-gray-400 text-xs">Strike Rate</p>
//                                   <p className="text-sm font-bold text-cyan-400">
//                                     {player.strikeRate}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="bg-[#232533] p-2 rounded-lg">
//                                 <div className="flex items-center justify-between">
//                                   <span className="text-sm font-medium text-white">
//                                     Auction Status
//                                   </span>
//                                   <span
//                                     className={`text-xs px-2 py-1 rounded-full ${
//                                       player.isSold
//                                         ? 'bg-green-500/20 text-green-400'
//                                         : 'bg-red-500/20 text-red-400'
//                                     }`}
//                                   >
//                                     {player.isSold ? 'SOLD' : 'UNSOLD'}
//                                   </span>
//                                 </div>
//                                 {player.isSold && (
//                                   <div className="mt-1 text-xs flex justify-between text-gray-400">
//                                     <span>{player.soldTeam}</span>
//                                     <span className="text-cyan-400 font-bold">
//                                       {player.soldAmount}
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-center col-span-full text-red-400">
//                       No players found.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Content>
//         </TeamsContainer>
//   );
// };

// export default Players;


import { useState, useEffect } from 'react';
import { FaFlag, FaUser } from 'react-icons/fa';
import { PiCricketBold } from 'react-icons/pi';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const TeamsContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-y: auto;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    opacity: 0.2;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
`;

const PlayerCard = styled.div`
  flex: none;
  width: 300px;
  margin-right: 20px;
  background: transparent;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Players = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playersData, setPlayersData] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/getteamplayers/${id}`);
      const data = await response.json();
      if (response.ok) {
        setPlayersData(data);
        setFilteredPlayers(data); // Initial data for filtered players
      } else {
        toast.error('Error fetching players data');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [id]);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredPlayers(playersData);
    } else {
      const filtered = playersData.filter((player) =>
        player.name.toLowerCase().includes(query)
      );
      setFilteredPlayers(filtered);
    }
  };

  return (
    <TeamsContainer>
      <Content>
        <div className="min-h-screen text-white">
          <div className="p-6">
            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="Search for players..."
                value={searchQuery}
                onChange={handleChange}
                className="bg-[#161929] text-cyan-400 px-4 py-2 rounded-lg w-full md:w-1/2 outline-none shadow-[0_0_10px_rgba(0,255,255,0.5)] focus:shadow-[0_0_10px_rgba(0,255,255,0.8)]"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex justify-center"
                    style={{ minWidth: '350px', minHeight: '300px' }}
                  >
                    <div
                      className={`bg-transparent border rounded-lg overflow-hidden shadow-md hover:bg-[#161929] cursor-pointer transition-colors duration-300 ease-in-out ${
                        player.isSold
                          ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] border-cyan-100'
                          : 'shadow-[0_0_10px_rgba(239,68,68,0.2)] border-red-100'
                      }`}
                    >
                      <div className="relative rounded-lg">
                        <div className="relative">
                          <div className="w-24 h-24 mx-auto mt-4 rounded-full overflow-hidden border-2 border-cyan-500/30">
                            <img
                              src={player.image}
                              alt={`Image of ${player.name}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-3 right-3 bg-gray-900/70 px-2 py-1 rounded-full flex items-center space-x-1">
                            <FaFlag className="text-cyan-500 w-3 h-3" />
                            <span className="text-xs text-white">
                              {player.nationality}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="text-center">
                            <h2 className="text-lg font-bold text-cyan-400">
                              {player.name}
                            </h2>
                            <div className="flex justify-center space-x-2 text-gray-400 text-xs">
                              <div className="flex items-center">
                                <FaUser className="text-cyan-500 w-3 h-3" />
                                <span className="ml-1">
                                  {player.age} years
                                </span>
                              </div>
                              <div className="flex items-center">
                                <PiCricketBold className="text-cyan-500 w-3 h-3" />
                                <span className="ml-1">{player.role}</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#232533] p-2 rounded-lg">
                              <p className="text-gray-400 text-xs">Runs</p>
                              <p className="text-sm font-bold text-cyan-400">
                                {player.runs}
                              </p>
                            </div>
                            <div className="bg-[#232533] p-2 rounded-lg">
                              <p className="text-gray-400 text-xs">Wickets</p>
                              <p className="text-sm font-bold text-cyan-400">
                                {player.wickets}
                              </p>
                            </div>
                            <div className="bg-[#232533] p-2 rounded-lg">
                              <p className="text-gray-400 text-xs">Strike Rate</p>
                              <p className="text-sm font-bold text-cyan-400">
                                {player.strikeRate}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#232533] p-2 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-white">
                                Auction Status
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  player.isSold
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}
                              >
                                {player.isSold ? 'SOLD' : 'UNSOLD'}
                              </span>
                            </div>
                            {player.isSold && (
                              <div className="mt-1 text-xs flex justify-between text-gray-400">
                                <span>{player.soldTeam}</span>
                                <span className="text-cyan-400 font-bold">
                                  {player.soldAmount}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-red-400">
                  No players found.
                </p>
              )}
            </div>
          </div>
        </div>
      </Content>
    </TeamsContainer>
  );
};

export default Players;