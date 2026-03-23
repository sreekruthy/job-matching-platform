import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
   useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "recruiter") {
      navigate("/login");
    }
  }, [navigate]);
  const [job, setJob] = useState({
    title: "",
    skills: "",
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/jobs`,
        {
          title: job.title,
          skills: job.skills.split(","),
        },
        {
          headers: {Authorization: token},
        }
      );

      alert("Job posted!");
      navigate("/dashboard"); // Redirect to dashboard after posting job
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    }
  };

  return (
    <div>
      <h2>Post Job</h2>
      <input
        placeholder="Job Title"
        onChange={(e) => setJob({ ...job, title: e.target.value })}
      />
      <input
        placeholder="Skills"
        onChange={(e) => setJob({ ...job, skills: e.target.value })}
      />
      <br /><br />
      <button onClick={handleSubmit}>Post</button>
      <br /><br />
      <button onClick={() => navigate("/applicants")}>
        View Applicants
        </button>
    </div>
  );
}

export default PostJob;