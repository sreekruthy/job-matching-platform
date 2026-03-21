import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AddSkills from "./pages/AddSkills";
import PostJob from "./pages/PostJob";

function App() {
  return (
  <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-skills" element={<AddSkills />} />
        <Route path="/post-job" element={<PostJob />} />
  </Routes>
  );
}

export default App;