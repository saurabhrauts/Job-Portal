import { useEffect, useState } from "react";
import { getAdminJobs, deleteJob } from "../api/jobApi";
import { useNavigate } from "react-router-dom";

function MyJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  // FETCH RECRUITER JOBS
  const fetchJobs = async () => {

    try {

      const res = await getAdminJobs();

      setJobs(res.data.jobs);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // DELETE JOB
  const handleDelete = async (id) => {

    try {

      const res = await deleteJob(id);

      alert(res.data.message);

      fetchJobs();

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message);

    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Jobs
        </h1>

        <button
          onClick={() => navigate("/create-job")}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Create Job
        </button>

      </div>

      {/* EMPTY */}
      {jobs.length === 0 ? (

        <div className="bg-white shadow rounded-xl p-8 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No Jobs Created
          </h2>

          <p className="text-gray-500 mt-2">
            Start creating jobs.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition"
            >

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-gray-800">
                {job.title}
              </h2>

              {/* COMPANY */}
              <p className="text-gray-600 mt-3">
                🏢 {job.company?.name}
              </p>

              {/* LOCATION */}
              <p className="text-gray-600 mt-1">
                📍 {job.location}
              </p>

              {/* SALARY */}
              <p className="text-gray-600 mt-1">
                💰 ₹ {job.salary}
              </p>

              {/* JOB TYPE */}
              <p className="text-gray-600 mt-1">
                💼 {job.jobType}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3 mt-6">

                {/* EDIT */}
                <button
                  onClick={() =>
                    navigate(`/job/edit/${job._id}`)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(job._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

                {/* APPLICANTS */}
                <button
                  onClick={() =>
                    navigate(`/applicants/${job._id}`)
                  }
                  className="bg-black text-white px-4 py-2 rounded-lg"
                >
                  View Applicants
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyJobs;