import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

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

const Auction = () => {
  return (
    <TeamsContainer>
      <Content>
        <Navbar />
 
      </Content>
    </TeamsContainer>
  );
};

export default Auction;
