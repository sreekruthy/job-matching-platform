import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,  // Use environment variable for API URL
        form
      );

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 style={{ color: "#2c3e50" }}>
        Login to Job Matcher
      </h2>
      <p style={{ fontSize: "14px", color: "gray" }}>
        (by Sreekruthy)
      </p>

      <input
        className="form-control mb-2"
        placeholder="Enter your email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Enter password"
        type="password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        className="btn btn-primary"
        style={{ backgroundColor: "#34495e", border: "none" }}
        onClick={handleLogin}
      >
        Login
      </button>
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#2980b9" }}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;