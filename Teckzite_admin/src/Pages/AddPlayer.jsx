import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddPlayercss.css";

// Player Form Modal Component
function PlayerModal({ showModal, onClose, onAddPlayer }) {
  const validationSchema = Yup.object({
    playerName: Yup.string().required("Player name is required"),
    role: Yup.string().required("Role is required"),
    description: Yup.string().required("Description is required"),
    playerImage: Yup.mixed().required("Image is required").nullable(),
  });

  const handleSubmit = (values) => {
    onAddPlayer(values);
    onClose();
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Add Player</h2>
          <Formik
            initialValues={{
              playerName: "",
              role: "batsman",
              description: "",
              playerImage: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div>
                  <label>Player Name:</label>
                  <Field
                    type="text"
                    name="playerName"
                    placeholder="Enter player name"
                    required
                  />
                  <ErrorMessage name="playerName" component="div" />
                </div>

                <div>
                  <label>Role:</label>
                  <Field as="select" name="role" required>
                    <option value="batsman">Batsman</option>
                    <option value="bowler">Bowler</option>
                    <option value="allrounder">Allrounder</option>
                    <option value="wicketkeeper">Wicket Keeper</option>
                  </Field>
                  <ErrorMessage name="role" component="div" />
                </div>

                <div>
                  <label>Description:</label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="4"
                    placeholder="Enter player description"
                    required
                  />
                  <ErrorMessage name="description" component="div" />
                </div>

                <div>
                  <label>Upload Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("playerImage", event.currentTarget.files[0]);
                    }}
                    required
                  />
                  <ErrorMessage name="playerImage" component="div" />
                </div>

                <div className="cardbutton">
                  <button type="button" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
}

// Player Card Component
function PlayerCard({ player, index }) {
  const { playerName, role, description, playerImage } = player;
  const imageUrl = playerImage ? URL.createObjectURL(playerImage) : "";

  return (
    <div className="player-card">
      <img src={imageUrl} alt={playerName} />
      <div>
        <strong>Player {index + 1}: {playerName}</strong>
        <p>Role: {role}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

// Main App Component
function AddPlayer() {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");

  const addPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
  };

  const filteredPlayers = roleFilter
    ? players.filter((player) => player.role === roleFilter)
    : players;

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)}>Add Player</button>

      <div className="filter">
        <label>Filter by Role: </label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="batsman">Batsman</option>
          <option value="bowler">Bowler</option>
          <option value="allrounder">Allrounder</option>
          <option value="wicketkeeper">Wicket Keeper</option>
        </select>
      </div>

      <div className="players-list">
        {filteredPlayers.map((player, index) => (
          <PlayerCard key={index} player={player} index={index} />
        ))}
      </div>

      <PlayerModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onAddPlayer={addPlayer}
      />
    </div>
  );
}

export default AddPlayer;
