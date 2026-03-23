import { useEffect, useState } from "react";
import axios from "axios";

function ViewApplicants() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/jobs/applicants`,
        { headers: { Authorization: token } }
      );

      setData(res.data);
    };

    fetchApplicants();
  }, []);

  return (
    <div>
      <h2>Applicants</h2>
      {data.map((job) => (
        <div key={job._id}>
          <h4>{job.title}</h4>
          <ul>
            {job.applicants.map((a, i) => (
              <li key={i}>{a.name} - {a.email}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ViewApplicants;