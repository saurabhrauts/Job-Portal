import { useEffect, useState } from "react";
import { getAllJobs } from "../api/jobApi";
import { applyJob } from "../api/applicationApi";
import { useNavigate } from "react-router-dom";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  // FILTER STATES
  const [keyword, setKeyword] = useState("");

  const [location, setLocation] = useState("");

  const [jobType, setJobType] = useState("");

  const navigate = useNavigate();

  // FETCH JOBS
  const fetchJobs = async () => {

    try {

      const res = await getAllJobs(
        keyword,
        location,
        jobType
      );

      setJobs(res.data.jobs);

    } catch (error) {

      console.log(error);

    }
  };

  // AUTO FETCH
  useEffect(() => {

    fetchJobs();

  }, [keyword, location, jobType]);

  // APPLY JOB
  const handleApply = async (jobId) => {

    try {

      const res = await applyJob(jobId);

      alert(res.data.message);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );

    }
  };

  return (

    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Available Jobs
      </h1>

      {/*  FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* JOB TYPE */}
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border p-2 rounded w-full"
        >

          <option value="">
            All Types
          </option>

          <option value="full-time">
            Full Time
          </option>

          <option value="part-time">
            Part Time
          </option>

          <option value="internship">
            Internship
          </option>

        </select>

      </div>

      {/* JOBS */}
      <div className="grid gap-6 md:grid-cols-2">

        {jobs.length === 0 ? (

          <div>

            <h2 className="text-xl text-gray-500">
              No Jobs Found
            </h2>

          </div>

        ) : (

          jobs.map((job) => (

            <div
              key={job._id}
              className="border rounded-lg p-5 shadow hover:shadow-lg transition"
            >

              {/* TITLE */}
              <h2 className="text-xl font-bold">
                {job.title}
              </h2>

              {/* COMPANY */}
              <p className="text-gray-600 mt-1">
                🏢 {job.company?.name}
              </p>

              {/* LOCATION */}
              <p className="text-gray-600">
                📍 {job.location}
              </p>

              {/* JOB TYPE */}
              <p className="text-gray-600">
                💼 {job.jobType}
              </p>

              {/* SALARY */}
              <p className="text-gray-600">
                💰 ₹ {job.salary}
              </p>

              {/* BUTTONS */}
              <div className="mt-4 flex gap-3">

                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleApply(job._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Apply
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Jobs;