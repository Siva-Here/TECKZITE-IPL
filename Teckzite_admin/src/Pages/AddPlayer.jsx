import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa'; // Importing React Icons
import { toast } from 'react-toastify'; // Importing Toast for notifications
import ProfileCard from '../components/Profilecard';

// Styled components
const GradientCards = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  position: relative;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  background: rgb(37, 44, 59);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  margin-top: 90px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #333;
  color: #ff00ff;
  font-size: 1rem;
`;

const TableData = styled.td`
  padding: 12px;
  text-align: left;
  color: white;
  border-bottom: 1px solid #444;
  font-size: 0.9rem;
`;

const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 10rem;
  transition: background 0.3s ease;
  position: absolute;
  top: 20px;
  right: 20px;
  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }
`;

const ActionButton = styled.button`
  background: none;
  color: #ff00ff;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 1.2rem;
  &:hover {
    color: #e600e6;
  }
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: rgb(37, 44, 59);
  color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.h2`
  color: #ff00ff;
  text-align: center;
  font-size: 2rem;
  margin: 1rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #fff;
  color: black;
`;

const ModalSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #fff;
  color: black;
`;

const SubmitButton = styled.button`
  background: #ff00ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  margin-top: 20px;
  &:hover {
    background: #e600e6;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ff00ff;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #e600e6;
  }
`;

const players = [
  {
    name: 'Virat Kohli',
    nationality: 'India',
    age: 34,
    role: 'Batsman',
    runs: 12000,
    wickets: 0,
    isDebut: true,
    image: 'https://example.com/virat.jpg',
    basePrice: 100000,
    strikeRate: '150.25',
    isSold: false,
    soldTeam: null,
    soldAmount: 100000,
  },
  {
    name: 'Rohit Sharma',
    nationality: 'India',
    age: 36,
    role: 'Batsman',
    runs: 8000,
    wickets: 0,
    isDebut: false,
    image: 'https://example.com/rohit.jpg',
    basePrice: 80000,
    strikeRate: '136.50',
    isSold: false,
    soldTeam: null,
    soldAmount: 80000,
  },
  {
    name: 'Jasprit Bumrah',
    nationality: 'India',
    age: 29,
    role: 'Bowler',
    runs: 500,
    wickets: 250,
    isDebut: true,
    image: 'https://example.com/jasprit.jpg',
    basePrice: 90000,
    strikeRate: '100.50',
    isSold: false,
    soldTeam: null,
    soldAmount: 90000,
  },
  {
    name: 'Ben Stokes',
    nationality: 'England',
    age: 33,
    role: 'Allrounder',
    runs: 5000,
    wickets: 150,
    isDebut: true,
    image: 'https://example.com/ben_stokes.jpg',
    basePrice: 120000,
    strikeRate: '135.00',
    isSold: false,
    soldTeam: null,
    soldAmount: 120000,
  },
  {
    name: 'MS Dhoni',
    nationality: 'India',
    age: 42,
    role: 'Wicketkeeper',
    runs: 10000,
    wickets: 0,
    isDebut: true,
    image: 'https://example.com/ms_dhoni.jpg',
    basePrice: 150000,
    strikeRate: '138.90',
    isSold: false,
    soldTeam: null,
    soldAmount: 150000,
  },
  {
    name: 'Kane Williamson',
    nationality: 'New Zealand',
    age: 33,
    role: 'Batsman',
    runs: 7000,
    wickets: 0,
    isDebut: false,
    image: 'https://example.com/kane_williamson.jpg',
    basePrice: 95000,
    strikeRate: '130.75',
    isSold: false,
    soldTeam: null,
    soldAmount: 95000,
  },
  {
    name: 'David Warner',
    nationality: 'Australia',
    age: 37,
    role: 'Batsman',
    runs: 8000,
    wickets: 0,
    isDebut: false,
    image: 'https://example.com/david_warner.jpg',
    basePrice: 110000,
    strikeRate: '142.00',
    isSold: false,
    soldTeam: null,
    soldAmount: 110000,
  },
  {
    name: 'Rashid Khan',
    nationality: 'Afghanistan',
    age: 25,
    role: 'Bowler',
    runs: 100,
    wickets: 300,
    isDebut: true,
    image: 'https://example.com/rashid_khan.jpg',
    basePrice: 85000,
    strikeRate: '88.75',
    isSold: false,
    soldTeam: null,
    soldAmount: 85000,
  }
];




const AddPlayer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    nationality: '',
    age: '',
    role: 'Batsman',
    runs: '',
    wickets: '',
    strikeRate: '',
    image: '',
    basePrice: '',
    isDebut: false,
  });
  const [playerprofile, setplayerProfile] = useState(false);
  const [singleplayer,setSingleplayer] = useState({
    name: '',
    nationality: '',
    age: '',
    role: 'Batsman',
    runs: '',
    wickets: '',
    strikeRate: '',
    image: '',
    basePrice: '',
    isDebut: false,
  });

  const handleAddPlayer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({
      ...newPlayer,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('New player added successfully!');
    setNewPlayer({
      name: '',
      nationality: '',
      age: '',
      role: 'Batsman',
      runs: '',
      wickets: '',
      strikeRate: '',
      image: '',
      basePrice: '',
      isDebut: false,
    });
    setIsModalOpen(false);
  };

  const handleEditPlayer = (playerName) => {
    alert(`Edit player: ${playerName}`);
    // Implement the functionality to edit the player
  };

  const handleDeletePlayer = (playerName) => {
    alert(`Delete player: ${playerName}`);
    // Implement the functionality to delete the player
  };

  const handleComponent = (player) =>{
    setSingleplayer(player);
    setplayerProfile(true);
    console.log(playerprofile);
  }
  const handleClose = ()=>{
    setplayerProfile(false);
  }

  return (
    <GradientCards>
      <NeonButton onClick={handleAddPlayer}>Add New Player</NeonButton>
      {/* <ProfileCard value={players[0]}/> */}

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Runs</TableHeader>
              <TableHeader>Wickets</TableHeader>
              <TableHeader>Strike Rate</TableHeader>
              <TableHeader>Base Price</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} onClick={()=>{handleComponent(player)}}>
                <TableData>{player.name}</TableData>
                <TableData>{player.role}</TableData>
                <TableData>{player.runs}</TableData>
                <TableData>{player.wickets}</TableData>
                <TableData>{player.strikeRate}</TableData>
                <TableData>${player.basePrice}</TableData>
                <TableData>
                  <ActionButton onClick={() => handleEditPlayer(player.name)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton onClick={() => handleDeletePlayer(player.name)}>
                    <FaTrashAlt />
                  </ActionButton>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>
            <FaTimes />
          </CloseButton>
          <ModalHeader>Add New Player</ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <ModalInput
              type="text"
              name="name"
              placeholder="Player Name"
              value={newPlayer.name}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={newPlayer.nationality}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="number"
              name="age"
              placeholder="Age"
              value={newPlayer.age}
              onChange={handleInputChange}
              required
            />
            <ModalSelect
              name="role"
              value={newPlayer.role}
              onChange={handleInputChange}
              required
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
            </ModalSelect>
            <ModalInput
              type="number"
              name="runs"
              placeholder="Runs"
              value={newPlayer.runs}
              onChange={handleInputChange}
            />
            <ModalInput
              type="number"
              name="wickets"
              placeholder="Wickets"
              value={newPlayer.wickets}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="strikeRate"
              placeholder="Strike Rate"
              value={newPlayer.strikeRate}
              onChange={handleInputChange}
            />
            <ModalInput
              type="file"
              name="image"
              title="Upload player image"
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, image: e.target.files[0] })
              }
              required
            />
            <ModalInput
              type="number"
              name="basePrice"
              placeholder="Base Price"
              value={newPlayer.basePrice}
              onChange={handleInputChange}
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </ModalForm>
        </ModalContent>
      </Modal>

     {
      playerprofile && (
        <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // backgroundColor: 'white',
          // borderRadius: '10px',
          // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          // padding: '20px',
          zIndex: 1000,
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
        <ProfileCard player={singleplayer} />
      </div>
      )
     }
    </GradientCards>
  );
};

export default AddPlayer;
