import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your companies, jobs and applicants
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Create Company */}
        <Link to="/create-company">

          <div className="bg-white border rounded-2xl p-6 shadow hover:shadow-2xl transition cursor-pointer">

            <div className="text-5xl mb-4">
              🏢
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Create Company
            </h2>

            <p className="text-gray-500 mt-2">
              Add and manage your company profile
            </p>

          </div>

        </Link>

        {/* Create Job */}
        <Link to="/create-job">

          <div className="bg-white border rounded-2xl p-6 shadow hover:shadow-2xl transition cursor-pointer">

            <div className="text-5xl mb-4">
              💼
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Create Job
            </h2>

            <p className="text-gray-500 mt-2">
              Post new jobs for candidates
            </p>

          </div>

        </Link>

        {/* My Jobs */}
        <Link to="/my-jobs">

          <div className="bg-white border rounded-2xl p-6 shadow hover:shadow-2xl transition cursor-pointer">

            <div className="text-5xl mb-4">
              📋
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              My Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              View and manage all posted jobs
            </p>

          </div>

        </Link>

      </div>

    </div>
  );
}

export default Dashboard;