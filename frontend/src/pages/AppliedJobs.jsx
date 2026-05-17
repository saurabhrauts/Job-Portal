import React, { useEffect, useState } from "react";
import { getMyApplications } from "../api/applicationApi";

function AppliedJobs() {

  const [applications, setApplications] = useState([]);

  // FETCH APPLICATIONS
  const fetchApplications = async () => {

    try {

      const res = await getMyApplications();

      setApplications(res.data.applications);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        My Applied Jobs
      </h1>

      {/* EMPTY */}
      {applications.length === 0 ? (

        <div className="bg-white shadow rounded-xl p-8 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No Applications Found
          </h2>

          <p className="text-gray-500 mt-2">
            Start applying for jobs.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition"
            >

              {/* JOB TITLE */}
              <h2 className="text-2xl font-bold text-gray-800">
                {app.job?.title}
              </h2>

              {/* COMPANY */}
              <p className="text-gray-600 mt-3">
                🏢 {app.job?.company?.name}
              </p>

              {/* LOCATION */}
              <p className="text-gray-600 mt-1">
                📍 {app.job?.location}
              </p>

              {/* SALARY */}
              <p className="text-gray-600 mt-1">
                💰 ₹ {app.job?.salary}
              </p>

              {/* STATUS */}
              <div className="mt-5">

                <span className="font-semibold text-gray-700">
                  Status:
                </span>

                <span
                  className={`ml-3 px-4 py-1 rounded-full text-sm text-white font-medium
                  ${
                    app.status === "pending"
                      ? "bg-yellow-500"
                      : app.status === "accepted"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {app.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AppliedJobs;