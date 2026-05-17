import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../api/jobApi";
import { applyJob } from "../api/applicationApi";

function JobDetails() {

  const { id } = useParams();
  const [job, setJob] = useState(null);

  // job fetch
  const fetchJob = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data.job);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // APPLY JOB FUNCTION
  const handleApply = async () => {
    try {

      const res = await applyJob(job._id);

      alert(res.data.message || "Applied Successfully");

    } catch (error) {

      console.log(error);
      alert(error.response?.data?.message || "Error occurred");

    }
  };

  if (!job) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 border p-6 rounded shadow">

      <h1 className="text-2xl font-bold">
        {job.title}
      </h1>

      <p className="mt-2 text-gray-600">
        🏢 Company: {job.company?.name}
      </p>

      <p className="text-gray-600">
        📍 Location: {job.location}
      </p>

      <p className="text-gray-600">
        💰 Salary: {job.salary}
      </p>

      <p className="mt-4">
        {job.description}
      </p>

      {/* APPLY BUTTON */}
      <div className="mt-6">

        <button
          onClick={handleApply}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Now
        </button>

      </div>

    </div>
  );
}

export default JobDetails;