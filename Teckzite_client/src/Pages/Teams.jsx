import React from 'react';
import styled from 'styled-components';
import { FiUsers } from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


const TeamsContainer = styled.div`
  position: relative;
  min-height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Enable scrolling */

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

const Content = styled.div`
  position: relative;
  z-index: 1; /* Ensure content is above the background */
  color: white;
  text-align: center;
  padding: 20px;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow the items to wrap to the next line */
  justify-content: start; /* Center the items horizontally */
  gap: 30px; /* Space between the items */
  margin: 2.5rem auto; /* Center the grid */
  max-width: 960px; /* Optional: Set a maximum width for the grid */
  align-items: center; /* Center items vertically */

  @media (max-width: 1000px) {
    justify-content: center; /* Align items to the start on small screens */
  }
`;


const Teams = () => {
  const [teamData,setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleclick = (id) =>{
    navigate(`/teams/${id}`);
  }


   const fetchTeams = async () => {
      try {
        const response = await fetch(`${Backend_Url}/api/getTeams`);
        const data = await response.json();
        if (response.ok) {
          setTeamData(data);
          setLoading(false);
        } else {
          toast.error("Failed to fetch team data.");
        }
      } catch (err) {
        toast.error("Error fetching team data.");
        console.error(err);
      }
    };
    
  
    useEffect(() => {
      fetchTeams();
    }, []);
  return (
   loading ? (
    <TeamsContainer>
    <Content>
      <div className="min-h-screen flex items-center justify-center">
      <div className="lds-ripple"><div></div><div></div></div>
      </div>
    </Content>
  </TeamsContainer>
   )
   : (
    <TeamsContainer>
    <Content>
      {
        teamData.length > 0 ? (
          <GridWrapper>
          {teamData.map((team, index) => (
            <div
              className="relative w-[300px]"
              key={index}
            >
              <div className="group relative w-full cursor-pointer">
                {/* Card Background */}
                <div className="relative bg-[#161929]  border border-cyan-500/20 p-4 rounded-lg shadow-lg">
                  {/* Holographic Border Effect */}
                  <div className="absolute inset-[1px] bg-gradient-to-br from-cyan-500/10 via-cyan-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
  
                  {/* Content Container */}
                  <div className="relative flex flex-col space-y-4">
                    {/* Team Image Container with Holographic Frame */}
                    <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-[#161929] to-cyan-500 opacity-50 blur-md"></div>
                      <div className="relative h-full border-2 border-cyan-500/50 rounded-lg overflow-hidden">
                        <div className="absolute inset-0  z-10"></div>
                        <img
                          src={`${team.teamID}.jpg`}
                          alt={team.teamID}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
  
                    {/* Team Name with Neon Effect */}
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00ffff] text-center tracking-wider">
                      {team.teamID}
                    </h2>
  
                    {/* View Players Button */}
                    <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#161929] to-cyan-500 hover:from-cyan-600 hover:to-[#161929] backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded" onClick={()=>{handleclick(team._id)}}>
                      {/* Button Content */}
                      <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                        <span className="w-4 h-4"><FiUsers /></span>
                        View Players
                      </span>
  
                      {/* Geometric Accents */}
                      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
                      <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
                      <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
                      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
                    </button>
                  </div>
  
                  {/* Ambient Light Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-[#161929]/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-[#161929]/20 group-hover:to-cyan-500/20 transition-colors duration-300 pointer-events-none rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </GridWrapper>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold text-cyan-500">No Teams found
              </h1>
          </div>
        )
      }
    </Content>
  </TeamsContainer>
   )
  );
};

export default Teams;
