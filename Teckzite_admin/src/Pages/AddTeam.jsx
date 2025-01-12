import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddTeamcss.css"; // Add your CSS for styling
import axios from "axios";

function AddTeam() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const initialValues = {
    teamName: "",
    teamId: "",
    members: [
      { name: "", id: "" },
      { name: "", id: "" },
      { name: "", id: "" },
      { name: "", id: "" },
    ],
  };

  const validationSchema = Yup.object({
    teamName: Yup.string().required("Team name is required"),
    teamId: Yup.string().required("Team ID is required"),
    members: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Member name is required"),
          id: Yup.string()
            .length(7, "ID must be 7 characters")
            .required("Member ID is required"),
        })
      )
      .min(3, "At least 3 members are required")
      .max(4, "Maximum 4 members are allowed"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editIndex !== null) {
          // Editing existing team
          const updatedTeams = [...teams];
          updatedTeams[editIndex] = values;
          setTeams(updatedTeams);
          alert("Team updated successfully!");
        } else {
          // Adding a new team
          const response = await axios.post(
            "http://localhost:8000/createTeam",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setTeams([...teams, response.data]);
          alert("Team created successfully!");
        }
        resetForm();
        setShowModal(false);
        setEditIndex(null);
      } catch (error) {
        setTeams([...teams, values]);
        console.error("Error creating team:", error.response?.data || error.message);
        alert(`Error creating team: ${error.response?.data || error.message}`);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setShowModal(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    formik.setValues(teams[index]);
    setEditIndex(index);
    setShowModal(true);
  
  };

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)}>Add Team</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editIndex !== null ? "Edit Team" : "Add Team"}</h2>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h3>Select Team Name:</h3>
                <div className="radio-group">
                  {[
                    "RCB",
                    "CSK",
                    "KKR",
                    "SRH",
                    "DC",
                    "MI",
                    "PBKS",
                    "RR",
                    "LSG",
                    "GT",
                  ].map((team, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="teamName"
                        value={team}
                        checked={formik.values.teamName === team}
                        onChange={formik.handleChange}
                      />
                      {team}
                    </label>
                  ))}
                </div>
                {formik.touched.teamName && formik.errors.teamName && (
                  <p className="error">{formik.errors.teamName}</p>
                )}
              </div>

              <input
                type="text"
                name="teamId"
                placeholder="Team ID"
                value={formik.values.teamId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.teamId && formik.errors.teamId && (
                <p className="error">{formik.errors.teamId}</p>
              )}

              {formik.values.members.map((member, index) => (
                <div className="inline-fields" key={index}>
                  <input
                    type="text"
                    name={`members[${index}].name`}
                    placeholder={`Member ${index + 1} Name`}
                    value={member.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <input
                    type="text"
                    name={`members[${index}].id`}
                    placeholder={`Member ${index + 1} ID (7 digits)`}
                    value={member.id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.members?.[index]?.name &&
                    formik.errors.members?.[index]?.name && (
                      <p className="error">{formik.errors.members[index].name}</p>
                    )}
                  {formik.touched.members?.[index]?.id &&
                    formik.errors.members?.[index]?.id && (
                      <p className="error">{formik.errors.members[index].id}</p>
                    )}
                </div>
              ))}

              <div className="card-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="cards">
        {teams.map((team, index) => (
          <div className="card" key={index}>
            <h3>{team.teamName}</h3>
            <p>Team ID: {team.teamId}</p>
            <ul>
              {team.members.map((member, i) => (
                <li key={i}>
                  {member.name} - {member.id}
                </li>
              ))}
            </ul>
            <div className="card-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button
                onClick={() =>
                  setTeams(teams.filter((_, i) => i !== index))
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddTeam;
