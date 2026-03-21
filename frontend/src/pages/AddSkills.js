import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSkills() {
  const [skills, setSkills] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/skills`,
        { skills: skills.split(",") },
        {
          headers: {Authorization: token},
        }
      );

      alert("Skills added!");
      navigate("/dashboard"); // Redirect to dashboard after adding skills
    } catch (err) {
      console.error(err);
      alert("Failed to add skills");
    }
  };

  return (
    <div>
      <h2>Add Skills</h2>
      <input
        placeholder="React, Node, SQL ,HTML ,CSS"
        onChange={(e) => setSkills(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default AddSkills;