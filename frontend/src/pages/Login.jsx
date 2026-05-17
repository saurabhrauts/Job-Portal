import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

//  REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

function Login() {

  const navigate = useNavigate();

  //  REDUX DISPATCH
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!input.email || !input.password || !input.role) {
      setError("All fields are required");
      return;
    }

    if (!input.email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    if (input.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (input.role !== "student" && input.role !== "recruiter") {
      setError("Select valid role");
      return;
    }

    try {

      const res = await loginUser(input);

      console.log(res.data);

      //  SAVE USER IN LOCAL STORAGE
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      //  SAVE USER IN REDUX
      dispatch(setUser(res.data.user));

      setError("Login success ✅");

      //  REDIRECT
      navigate("/");

    } catch (error) {

      console.log(error.response?.data);

      setError(
        error.response?.data?.message || "Login failed ❌"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p
            className={`text-sm text-center mb-2 ${
              error.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* hidden trick */}
          <input
            type="text"
            name="fakeuser"
            style={{ display: "none" }}
          />

          <input
            type="password"
            name="fakepass"
            style={{ display: "none" }}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            autoComplete="new-email"
            value={input.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full p-2 border rounded"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={input.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 border rounded"
          />

          {/* ROLE */}
          <select
            name="role"
            value={input.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>

            <option value="student">
              Student
            </option>

            <option value="recruiter">
              Recruiter
            </option>

          </select>

          {/* BUTTON */}
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">

            Login

          </button>

        </form>

        <p className="mt-4 text-center">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-500"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Login;