import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";

//  REDUX
import { useDispatch } from "react-redux";

import { setUser } from "./redux/authSlice";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AppliedJobs from "./pages/AppliedJobs";
import CreateJob from "./pages/CreateJob";
import CreateCompany from "./pages/CreateCompany";
import MyJobs from "./pages/MyJobs";
import Applicants from "./pages/Applicants";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";

import ProtectedRoute from "./components/ProtectedRoute";

// pages
import Jobs from "./pages/Jobs";

function App() {

  //  DISPATCH
  const dispatch = useDispatch();

  //  LOAD USER FROM LOCALSTORAGE
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {

      dispatch(setUser(user));

    }

  }, []);

  return (
    <>

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <AppliedJobs />
            </ProtectedRoute>
          }
        />

        {/* CREATE JOB */}
        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        {/* CREATE COMPANY */}
        <Route
          path="/create-company"
          element={
            <ProtectedRoute>
              <CreateCompany />
            </ProtectedRoute>
          }
        />

        {/* MY JOBS */}
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        {/* APPLICANTS */}
        <Route
          path="/applicants/:jobId"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>
  );
}

export default App;