import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getApplicants,
  updateStatus
} from "../api/applicationApi";

function Applicants() {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  // fetch applicants
  const fetchApplicants = async () => {

    try {

      const res = await getApplicants(jobId);

      setApplications(res.data.applications);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // update status
  const handleStatus = async (id, status) => {

    try {

      const res = await updateStatus(id, status);

      alert(res.data.message);

      fetchApplicants();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-8">
        Applicants
      </h1>

      {applications.length === 0 ? (

        <p>No applicants found</p>

      ) : (

        applications.map((app) => (

          <div
            key={app._id}
            className="border rounded p-5 mb-4 shadow"
          >

            <h2 className="text-xl font-bold">
              {app.applicant?.fullname}
            </h2>

            <p>📧 {app.applicant?.email}</p>

            <p>📞 {app.applicant?.phoneNumber}</p>

            <p className="mt-2">
              Status:
              <span className="font-bold ml-2">
                {app.status}
              </span>
            </p>

            <div className="mt-4 flex gap-3">

              <button
                onClick={() =>
                  handleStatus(app._id, "accepted")
                }
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleStatus(app._id, "rejected")
                }
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Applicants;