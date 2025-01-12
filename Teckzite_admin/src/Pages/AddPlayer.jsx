

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa'; // Importing React Icons
import { toast } from 'react-toastify'; // Importing Toast for notifications

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
    role: 'Batsman',
    runs: 12000,
    wickets: 0,
    strikeRate: '150.25',
    basePrice: 100000,
  },
  {
    name: 'Rohit Sharma',
    role: 'Batsman',
    runs: 8000,
    wickets: 0,
    strikeRate: '136.50',
    basePrice: 80000,
  },
  {
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    runs: 500,
    wickets: 250,
    strikeRate: '100.50',
    basePrice: 90000,
  },
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

  return (
    <GradientCards>
      <NeonButton onClick={handleAddPlayer}>Add New Player</NeonButton>

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
              <tr key={index}>
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
    </GradientCards>
  );
};

export default AddPlayer;
