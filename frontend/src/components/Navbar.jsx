import React from "react";

import { Link, useNavigate } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/authSlice";

function Navbar() {

  const navigate = useNavigate();


  const user = useSelector((state) => state.auth.user);


  const dispatch = useDispatch();

  //  LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    dispatch(logoutUser());

    navigate("/login");
  };

  return (

    <div className="bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <h1 className="text-xl font-bold">
        JobPortal
      </h1>

      <div className="flex items-center gap-6">

        {/* HOME */}
        <Link
          to="/"
          className="hover:text-gray-300"
        >
          Home
        </Link>

        {/* JOBS */}
        <Link
          to="/jobs"
          className="hover:text-gray-300"
        >
          Jobs
        </Link>

        {/* STUDENT NAVBAR */}
        {user?.role === "student" && (
          <>

            <Link
              to="/profile"
              className="hover:text-gray-300"
            >
              Profile
            </Link>

            <Link
              to="/my-applications"
              className="hover:text-gray-300"
            >
              My Applications
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>

          </>
        )}

        {/*  RECRUITER NAVBAR */}
        {user?.role === "recruiter" && (
          <>

            <Link
              to="/dashboard"
              className="hover:text-gray-300"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="hover:text-gray-300"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>

          </>
        )}

        {/*  NOT LOGGED IN */}
        {!user && (
          <Link
            to="/login"
            className="hover:text-gray-300"
          >
            Login
          </Link>
        )}

      </div>

    </div>
  );
}

export default Navbar;