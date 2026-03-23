import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "candidate") {
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/jobs/match`,
          {
            headers: { Authorization: token },
          }
        );

        setJobs(res.data);
      } catch (err) {
        console.log("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]); 

  return (
    <div className="container mt-5">
      <h2 style={{ color: "#2c3e50" }}>
        Job Matches for You (choose wisely!)
      </h2>

      {loading ? (
        <p>Loading jobs... please wait</p>
      ) : jobs.length === 0 ? (
        <div>
          <p>Please add your skills to see job matches</p>
          <button onClick={() => navigate("/add-skills")}>
            Add Skills
          </button>
        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="card p-3 mb-3"
            style={{
              backgroundColor: "#f8f9fa",
              borderLeft: "5px solid #007bff",
            }}
          >
            <h5>{job.title}</h5>
            <p>Match Score: {job.score}%</p>
            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");

                  await axios.post(
                    `${process.env.REACT_APP_API_URL}/jobs/apply/${job.jobId}`, // ✅ correct URL
                    {},
                    { headers: { Authorization: token } }
                  );

                  alert("Applied successfully!");
                } catch (err) {
                  console.error(err);
                  alert("Failed to apply");
                }
              }}
              className="btn btn-success"
            >
              Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;