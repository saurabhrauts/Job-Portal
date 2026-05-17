import { Link } from "react-router-dom";

//  REDUX
import { useSelector } from "react-redux";

function Profile() {

  //  GET USER FROM REDUX
  const user = useSelector(
    (state) => state.auth.user
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-6">

      {/* TOP PROFILE HEADER */}
      <div className="bg-linear-to-r from-black to-gray-800 shadow-xl rounded-3xl p-6 flex items-center gap-6 text-white">

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold shadow-lg">

          {user?.fullname?.charAt(0) || "U"}

        </div>

        {/* Info */}
        <div>

          <h1 className="text-3xl font-bold">
            {user?.fullname || "No Name"}
          </h1>

          <p className="text-gray-300 capitalize mt-1">
            {user?.role || "User"}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            {user?.email}
          </p>

        </div>

      </div>

      {/* 👨‍🎓 STUDENT PROFILE */}
      {user?.role === "student" && (

        <>
          {/* CONTENT GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT CARD */}
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition">

              <h2 className="text-xl font-semibold mb-5 border-b pb-3">
                Personal Info
              </h2>

              <div className="space-y-4 text-gray-700">

                <p>
                  <span className="font-semibold">
                    📞 Phone:
                  </span>{" "}
                  {user?.phoneNumber || "Not added"}
                </p>

                <p>
                  <span className="font-semibold">
                    📧 Email:
                  </span>{" "}
                  {user?.email}
                </p>

                <p>
                  <span className="font-semibold">
                    👤 Role:
                  </span>{" "}
                  {user?.role}
                </p>

              </div>

            </div>

            {/* RIGHT CARD */}
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition">

              <h2 className="text-xl font-semibold mb-5 border-b pb-3">
                About Me
              </h2>

              <p className="text-gray-600 mb-5 leading-7">
                {user?.profile?.bio || "No bio added yet"}
              </p>

              <h3 className="font-semibold mb-3">
                Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {user?.profile?.skills?.length > 0 ? (

                  user.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-black text-white px-4 py-1 rounded-full text-sm shadow"
                    >
                      {skill}
                    </span>
                  ))

                ) : (

                  <p className="text-gray-400">
                    No skills added
                  </p>

                )}

              </div>

            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">

            <Link to="/profile/edit">
              <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow">
                Edit Profile
              </button>
            </Link>

            <Link to="/my-applications">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow">
                My Applications
              </button>
            </Link>

          </div>
        </>
      )}

      {/* 👨‍💼 RECRUITER PROFILE */}
      {user?.role === "recruiter" && (

        <>
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">

            <h2 className="text-xl font-semibold mb-5 border-b pb-3">
              Recruiter Info
            </h2>

            <div className="space-y-4 text-gray-700">

              <p>
                <span className="font-semibold">
                  👤 Name:
                </span>{" "}
                {user?.fullname}
              </p>

              <p>
                <span className="font-semibold">
                  📧 Email:
                </span>{" "}
                {user?.email}
              </p>

              <p>
                <span className="font-semibold">
                  💼 Role:
                </span>{" "}
                {user?.role}
              </p>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 flex-wrap">

            <Link to="/profile/edit">
              <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow">
                Edit Profile
              </button>
            </Link>

            <Link to="/create-company">
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow">
                Create Company
              </button>
            </Link>

            <Link to="/create-job">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow">
                Create Job
              </button>
            </Link>

          </div>
        </>
      )}

    </div>
  );
}

export default Profile;