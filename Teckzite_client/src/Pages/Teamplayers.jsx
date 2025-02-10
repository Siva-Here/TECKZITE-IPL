import { useState, useEffect } from 'react';
import { FaFlag, FaUser, FaDollarSign, FaUsers, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { PiCricketBold } from 'react-icons/pi';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


// Styled Components
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
const Players = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playersData, setPlayersData] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerRoles, setPlayerRoles] = useState([]);
  const [current, setCurrent] = useState(0);
  const [length,setLength] = useState();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const [playersResponse, teamResponse] = await Promise.all([
        fetch(`${Backend_Url}/api/getteamplayers/${id}`),
        fetch(`${Backend_Url}/api/getTeaminfo/${id}`)
      ]);

      if (!playersResponse.ok || !teamResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [playersData, teamData] = await Promise.all([
        playersResponse.json(),
        teamResponse.json()
      ]);

      setPlayersData(playersData || []);
      setFilteredPlayers(playersData || []);
      setTeamData(teamData);
      setPlayerRoles([
        { role: "Batsmen", count: teamData.batsmen },
        { role: "Bowlers", count: teamData.bowlers },
        { role: "All-rounders", count: teamData.allrounder },
        { role: "Wicketkeepers", count: teamData.wicketkeeper },
      ])
      setLength(playersData.length);
      setLoading(false);

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching data');
    } 
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredPlayers(playersData);
    } else {
      const filtered = playersData.filter((player) =>
        player.name.toLowerCase().includes(query)
      );
      console.log("filtered players:",filtered);
      setFilteredPlayers(filtered);
    }
  };
  useEffect(() => {
    setLength(filteredPlayers.length);
    setCurrent(0);
  }, [filteredPlayers]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

    if (!Array.isArray(filteredPlayers) || filteredPlayers.length < 0) {
      return null;
    }

  return (
  loading ? (
    <TeamsContainer>
    <Content>
      <div className="min-h-screen flex items-center justify-center">
      <div className="lds-ripple"><div></div><div></div></div>
      </div>
    </Content>
  </TeamsContainer>
  ):(
    <TeamsContainer>
    <Content>
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cyan-400  p-4 rounded-lg inline-block">
            {teamData.teamID}
          </h1>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for players..."
              value={searchQuery}
              onChange={handleChange}
              className="bg-[#161929] text-cyan-400 px-4 py-2 rounded-lg w-full md:w-1/2 outline-none shadow-[0_0_10px_rgba(0,255,255,0.5)] focus:shadow-[0_0_10px_rgba(0,255,255,0.8)]"
            />
          </div>
          {
            filteredPlayers.length > 0 ? (
              <section className='slider'>
                <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
                <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
                {filteredPlayers.map((player, index) => {
                  return (
                    <div
                      className={index === current ? 'slide active' : 'slide'}
                      key={index}
                    >
                      {
                        index === current && (
                          <div
                            className={` from-cyan-900 via-black to-gray-900 border rounded-lg overflow-hidden shadow-md hover:bg-[#161929] cursor-pointer transition-colors duration-300 ease-in-out image ${player.isSold
                              ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] border-cyan-100'
                              : 'shadow-[0_0_10px_rgba(239,68,68,0.2)] border-red-100'
                              }`}
                          >
                            <div className="relative rounded-lg">
                              <div className="relative">
                                <div className="w-36 h-36 mx-auto mt-4 rounded-full overflow-hidden border-2 border-cyan-500/30">
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
                                <div className="grid grid-cols-3 gap-3">
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
                                    <p className="text-gray-400 text-xs">50/100</p>
                                    <p className="text-sm font-bold text-cyan-400">
                                      {player.fiftybyhundred}
                                    </p>
                                  </div>
                                  <div className="bg-[#232533] p-2 rounded-lg">
                                    <p className="text-gray-400 text-xs">Strike Rate</p>
                                    <p className="text-sm font-bold text-cyan-400">
                                      {player.strikeRate}
                                    </p>
                                  </div>
                                  <div className="bg-[#232533] p-2 rounded-lg">
                                    <p className="text-gray-400 text-xs">Economy</p>
                                    <p className="text-sm font-bold text-cyan-400">
                                      {player.economy}
                                    </p>
                                  </div>
                                  <div className="bg-[#232533] p-2 rounded-lg">
                                    <p className="text-gray-400 text-xs">Average</p>
                                    <p className="text-sm font-bold text-cyan-400">
                                      {player.average}
                                    </p>
                                  </div>
                                </div>
                                <div className="bg-[#232533] p-2 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-white">
                                      Auction Status
                                    </span>
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${player.isSold
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
                                        {player.soldAmount} Rs
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  );
                })}
              </section>
            ) : "No players found"
          }
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <i className="fas fa-dollar-sign text-cyan-400"></i> <span> <FaDollarSign />Purse </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-gradient from-cyan-9000 via-cyan to-gray-9000 '>
                  <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cyan-400 text-2xl font-bold">{teamData.remainingPurse}</p>
                        <p className="text-gray-400 text-sm">of {teamData.initialPurse}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <i className="fas fa-users text-cyan-400"></i> <FaUsers />Squad
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      {playerRoles.map((player, index) => (
                        <div key={index} className="text-center">
                          <p className="text-cyan-400 text-2xl font-bold">{player.count}</p>
                          <p className="text-gray-400 text-sm">{player.role}</p>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="overflow-x-auto mt-15  ">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-5 py-5 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          <FaUsers /> Team Owners
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamData.teamMembers?.map((owner, index) => (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-sm text-cyan-400">
                            {owner}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Content>
  </TeamsContainer>
  )
  );
};
export default Players;

