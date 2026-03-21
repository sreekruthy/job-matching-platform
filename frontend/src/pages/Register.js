import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://job-matching-platform-jgbg.onrender.com"; // Change this to your actual backend URL ( http://localhost:5001 for local testing)

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      alert("Registered successfully");
      console.log(res.data);
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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;