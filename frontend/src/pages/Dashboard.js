import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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
  }, []);

  return (
    <div className="container mt-5">
      <h2 style={{ color: "#2c3e50" }}>
        Job Matches for You (choose wisely!)
      </h2>
      <p style={{ fontSize: "14px", color: "gray" }}>
        (Sreekruthy)
      </p>

      {loading ? (
        <p>Loading jobs... please wait</p>
      ) : jobs.length === 0 ? (
        <p>Please add your skills to see job matches</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.jobId}
            className="card p-3 mb-3"
            style={{
              backgroundColor: "#f8f9fa",
              borderLeft: "5px solid #007bff",
            }}
          >
            <h5>{job.title}</h5>
            <p>Match Score: {job.score}%</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;