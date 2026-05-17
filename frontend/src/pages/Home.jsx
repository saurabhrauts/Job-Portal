import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobs } from "../api/jobApi";

function Home() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [latestJobs, setLatestJobs] = useState([]);

  //  SEARCH
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/jobs?keyword=${encodeURIComponent(search.trim())}`);
  };

  //  FETCH LATEST JOBS FROM DB
  const fetchLatestJobs = async () => {
    try {
      const res = await getAllJobs();

      // only latest 3 jobs
      setLatestJobs(res.data.jobs.slice(0, 3));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div className="bg-linear-to-r from-black to-gray-800 text-white py-24 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-5xl font-bold">
            Find Your Dream Job Today
          </h1>

          <p className="mt-5 text-lg text-gray-300">
            Discover thousands of jobs from top companies.
          </p>

          {/* SEARCH */}
          <div className="mt-8 flex justify-center">

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full max-w-xl px-5 py-3 rounded-l-lg text-black outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700"
            >
              Search
            </button>

          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex justify-center gap-4">

            <Link to="/jobs">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                Browse Jobs
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Get Started
              </button>
            </Link>

          </div>

        </div>

      </div>

      {/* CATEGORIES */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Data Analyst"
          ].map((item, index) => (

            <div
              key={index}
              onClick={() =>
                navigate(`/jobs?keyword=${encodeURIComponent(item)}`)
              }
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl cursor-pointer"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

      {/*  LATEST JOBS FROM DATABASE (FIXED) */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {latestJobs.length === 0 ? (

            <p className="text-center text-gray-500 col-span-3">
              No jobs available
            </p>

          ) : (

            latestJobs.map((job) => (

              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >

                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  🏢 {job.company?.name}
                </p>

                <p className="text-gray-600 mt-1">
                  📍 {job.location}
                </p>

                <p className="text-gray-600 mt-1">
                  💰 ₹ {job.salary}
                </p>

                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="mt-5 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  View Details
                </button>

              </div>

            ))

          )}

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 text-center py-5">
        © 2026 JobPortal. All Rights Reserved.
      </footer>

    </div>
  );
}

export default Home;