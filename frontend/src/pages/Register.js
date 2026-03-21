import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate", // Default role is candidate
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const navigate = useNavigate();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      alert("Registered successfully");
      console.log(res.data);
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      /><br /><br />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      /><br /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      /><br /><br />

      <select name="role" onChange={handleChange}>
        <option value="candidate">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select><br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;