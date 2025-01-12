
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './Homepagecss.css';
const socket = io('http://localhost:8000');

const HomePage = () => {
  const [player, setPlayer] = useState(null); // Current player data
  const [bidAmount, setBidAmount] = useState(0); // Current bid amount
  const [selectedTeam, setSelectedTeam] = useState(''); // Selected team for the bid

  // Fetch the current player on component load
  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = (bidPlace = null) => {
    const url = bidPlace
      ? `http://localhost:8000/api/playersToBuy?bidPlace=${bidPlace}`
      : 'http://localhost:8000/api/playersToBuy';

    axios
      .get(url)
      .then((response) => {
        if (response.data && typeof response.data === 'object') {
          setPlayer(response.data); // Update player state
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
    if (player?.bidplace) {
      fetchPlayer(player.bidplace + 1); // Fetch the next player based on current bidPlace
    }
  };

  const handlePrev = () => {
    if (player?.bidplace && player.bidplace > 1) {
      fetchPlayer(player.bidplace - 1); // Fetch the previous player based on current bidPlace
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

  const handleConfirmBid = () => {
    if (player) {
      axios
        .post('http://localhost:8000/api/bid', {
          playerId: player._id,
          soldAmount: bidAmount,
          soldTeam: selectedTeam,
        })
        .then(() => {
          alert('Bid confirmed!');
          fetchPlayer(player.bidplace + 1); // Automatically fetch the next player
        })
        .catch((err) => {
          console.error('Error confirming bid:', err);
        });
    }
  };

  return (
    <div className="container mt-5">
      {player ? (
        <>
          <div className="text-center">
            <img
              src={player.image}
              alt={player.name}
              className="img-fluid"
            />
          </div>
          <div className="mt-3">
            <h5>Name: {player.name}</h5>
            <p>Nationality: {player.nationality}</p>
            <p>Role: {player.role}</p>
            <p>
              Base Price: ₹{player.basePrice?.toLocaleString() || 'Not Available'}
            </p>
            <p>CurrentBid:{bidAmount}</p>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handlePrev}>
              Previous
            </button>
            <button className="btn btn-primary me-2" onClick={handleNext}>
              Next
            </button>
            <button className="btn btn-success me-2" onClick={handleIncreaseBid}>
              Increase Bid
            </button>
            <button className="btn btn-danger me-2" onClick={handleDecreaseBid}>
              Decrease Bid
            </button>
          
          </div>
          <div className="mt-3">
  <select
    className="form-select w-auto d-inline-block"
    value={selectedTeam}
    onChange={(e) => setSelectedTeam(e.target.value)}
  >
    <option value="">Select Team</option>
    {[...Array(10)].map((_, i) => (
      <option key={i} value={`Team ${i + 1}`}>
        Team {i + 1}
      </option>
    ))}
  </select>
</div>
<button
  className="btn btn-warning me-2"
  onClick={handleConfirmBid}
  disabled={!selectedTeam} // Disable button if no team is selected
>
  Confirm Bid
</button>

          <div className="mt-3">
            <h6>Bid Amount: ₹{bidAmount.toLocaleString()}</h6>
          </div>
        </>
      ) : (
        <p>No players available for auction.</p>
      )}
    </div>
  );
};

export default HomePage;
