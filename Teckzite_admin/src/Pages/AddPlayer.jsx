import { useState,useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa'; // Importing React Icons
import { toast } from 'react-toastify'; // Importing Toast for notifications
import ProfileCard from '../components/Profilecard';
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
//search styles
const SearchContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 50px auto;
  padding: 3px;
  background: rgb(37, 44, 59);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
   @media (max-width: 768px) {
    margin-top:30px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 7px;
  // border: 1px solid #ff00ff;
  border-radius: 5px;
  background: rgba(37, 44, 59, 0.8);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px #ff00ff;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;


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
  margin-top: 50px;
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
     @media (max-width: 768px) {
    width: 8rem; /* Decrease the width */
    padding: 0.5rem 1rem; /* Adjust padding */
  }

  @media (max-width: 480px) {
    width: 6rem; /* Further decrease width for very small devices */
    padding: 0.375rem 0.75rem; /* Adjust padding */
    font-size: 0.875rem; /* Reduce font size if needed */
    top:2px;
    right:0;
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

const AddPlayer = () => {
  const token = localStorage.getItem("Token");
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    nationality: '',
    age: '',
    role: '',
    runs: '',
    wickets: '',
    strikeRate: '',
    image: null,
    basePrice: '',
    isDebut: false,
    bidplace:'',
    set: '',
  

  });
  const [playerprofile, setplayerProfile] = useState(false);
  const [singleplayer, setSingleplayer] = useState({
    name: '',
    nationality: '',
    age: '',
    role: '',
    runs: '',
    wickets: '',
    strikeRate: '',
    image: null,
    basePrice: '',
    isDebut: false,
    bidplace:'',
    set: '',
    
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [Players, setPlayers] = useState([]);
  const [filterplayers,setFilterPlayers]=useState([]);
  const [editoption,setEditoption]=useState(false);
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
  const fetchPlayers=async()=>{
    try {
      const response = await fetch("http://localhost:8000/api/getplayers");
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setPlayers(data);
        setFilterPlayers(data);
      }
      else{
        console.log("error while fetching data");
        alert("Error while fetching data");
      }
    }
    catch(error){
       console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add all fields to FormData, including the image file
    Object.keys(newPlayer).forEach((key) => {
      if (key === 'image' && newPlayer.image) {
        formData.append(key, newPlayer.image); // Append the file object
      } else {
        formData.append(key, newPlayer[key]); // Append other fields
      }
    });
    if 
      (!editoption ){
        if(!newPlayer.image)
    {
      toast.error("Please upload an image.");
      return;
    }
  }


    console.log("New player:", newPlayer);
    setNewPlayer({
      name: '',
      nationality: '',
      age: '',
      role: '',
      runs: '',
      wickets: '',
      strikeRate: '',
      image:null,
      basePrice: '',
      isDebut: false,
      bidplace:'',
      set: '',
      
    });
    setIsModalOpen(false);
    
    savePlayers(formData);
  };

const savePlayers = async (formData) => {
  

  if (!token) {
    toast.error("JWT token is missing, please login again!");
    return;
  }
setUploading(true);
  try {
    const url = "http://localhost:8000/api/createplayer"; // Create API endpoint

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData, 
    });

    if (response.ok) {
      const responseData = await response.json();
      toast.success(responseData.message);
      setEditoption(false)
      setUploading(false)
      fetchPlayers();
      handleCloseModal();
    } else {
      const errorData = await response.json();
      setUploading(false)
      toast.error(errorData.message || "Failed to create or edit team!");
    }
  } catch (error) {
    toast.error("Error submitting team data, please try again!");
  }
};


  const handleEditPlayer = (player) => {
    console.log("player",player)
    setEditoption(true);
    setNewPlayer(player)
    setIsModalOpen(true)
    
  };

  const handleDeletePlayer =async(player) => {
   
    const id=player._id;
    
    try {
      const response = await fetch("http://localhost:8000/api/deletePlayer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }), // Send the ID in the request body
      });
      if (response.ok) {
        // Successfully deleted the player
        alert(`Player ${player.name} deleted successfully`);

        // Optionally, update the state to remove the player from the list
       fetchPlayers()
      } else {
        toast.error('Failed to delete the player');
        console.log('Error during player deletion:', response);
      }
    } catch (error) {
      toast.error('Error occurred while deleting the player');
      console.log(error);
    }
  };

  const handleComponent = (player) => {
    setSingleplayer(player);
    setplayerProfile(true);
    console.log(playerprofile);
  }
  const handleClose = () => {
    setplayerProfile(false);
  }


  const handleSearch = (e) => {
   
    const query = e.toLowerCase(); // Use a local variable for the query.
    setSearchQuery(query);

    if (query === "") {
      setPlayers(filterplayers); 
    } else {
      const filteredPlayers = filterplayers.filter((player) =>
        player.name.toLowerCase().includes(query)
      );
      setPlayers(filteredPlayers);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, []);
  return (
    <GradientCards>
      <NeonButton onClick={handleAddPlayer}>New player</NeonButton>

      {/* search field */}
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

        </SearchForm>
      </SearchContainer>
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
        <TableHeader>Bid Place</TableHeader>
        <TableHeader>Status</TableHeader>
      </tr>
    </thead>
    <tbody>
      {Players && Players.length > 0 ? (
        Players.map((player, index) => (
          <tr key={index} onClick={() => handleComponent(player)}>
            <TableData>{player.name}</TableData>
            <TableData>{player.role}</TableData>
            <TableData>{player.runs}</TableData>
            <TableData>{player.wickets}</TableData>
            <TableData>{player.strikeRate}</TableData>
            <TableData>${player.basePrice}</TableData>
            <TableData>{player.bidplace}</TableData>
            <TableData>{player.isSold?"sold":"unsold"}</TableData>
            <TableData
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click event.
              }}
            >
              <ActionButton onClick={() => handleEditPlayer(player)}>
                <FaEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDeletePlayer(player)}>
                <FaTrashAlt />
              </ActionButton>
            </TableData>
          </tr>
        ))
      ) : (
        <tr>
          <TableData colSpan="8" style={{ textAlign: 'center' }}>
            No players available
          </TableData>
        </tr>
      )}
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
              <option value="">select role</option>
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="allrounder">All-Rounder</option>
              <option value="wicketkeeper">Wicket Keeper</option>
            </ModalSelect>
            <ModalInput
              type="number"
              name="runs"
              placeholder="Runs"
              value={newPlayer.runs}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="number"
              name="wickets"
              placeholder="Wickets"
              value={newPlayer.wickets}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="text"
              name="strikeRate"
              placeholder="Strike Rate"
              value={newPlayer.strikeRate}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="file"
              name="image"
              
              title="Upload player image"
              onChange={(e) => {
                const file = e.target.files[0];
                setNewPlayer({ ...newPlayer, image: file });
              }}
             
            />
            <ModalInput
              type="number"
              name="basePrice"
              placeholder="Base Price"
              value={newPlayer.basePrice}
              onChange={handleInputChange}
              required
            />
            <label style={{marginRight:'10px'}}>
            Bid Place</label>
            <ModalInput
              type="number"
              name="bidplace"
              placeholder="Bid Place"
              value={newPlayer.bidplace}
              onChange={handleInputChange}
              required
            />
            <fieldset style={{ border: 'none', margin: '10px 0' }} >
              <legend style={{ fontWeight: 'bold' }}>Set</legend>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="set"
                  value="1"
                  checked={newPlayer.set == '1'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                  required
                />
                1
              </label>
              <label style={{ marginRight: '10px', }}>
                <input
                  type="radio"
                  name="set"
                  value="2"
                  checked={newPlayer.set == '2'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                2
              </label>
              <label style={{}}>
                <input
                  type="radio"
                  name="set"
                  value="3"
                  checked={newPlayer.set == '3'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                3
              </label>
            </fieldset>


            <SubmitButton type="submit">Submit</SubmitButton>
          </ModalForm>
        </ModalContent>
      </Modal>
      {uploading && (
        <div style={{ marginTop: "10px" }}>
        <SpinningCircles
  stroke="#000"  // Spinner color
  strokeWidth={4} // Thickness of the spinner
  speed={5}       // Rotation speed
  height="40px"   // Height of the spinner
  width="40px"    // Width of the spinner
/>

          <p>Uploading data...</p>
        </div>
      )}
      {
        playerprofile && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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
