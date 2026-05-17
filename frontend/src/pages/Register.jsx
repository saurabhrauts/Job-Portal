import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";

function Register() {

  const navigate = useNavigate(); // ✅ FIXED (top level hook)

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: ""
  });

  const [error, setError] = useState("");

  // change handler
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // validation
    if (
      !input.fullname ||
      !input.email ||
      !input.phoneNumber ||
      !input.password ||
      !input.role
    ) {
      setError("All fields are required");
      return;
    }

    if (input.password.length < 6) {
      setError("Password min 6 characters");
      return;
    }

    if (input.phoneNumber.length !== 10) {
      setError("Phone must be 10 digits");
      return;
    }

    try {

      const res = await registerUser(input);

      console.log(res.data);

      // optional success message
      setError("Register success ✅");

      //  BEST FLOW: direct home
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {

      console.log(error.response?.data);

      setError(
        error.response?.data?.message || "Register failed ❌"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-xl font-bold text-center mb-4">
          Register
        </h2>

        {error && (
          <p
            className={`text-center ${
              error.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {error}
          </p>
        )}

        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={input.fullname}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone"
            value={input.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <select
            name="role"
            value={input.role}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button className="w-full bg-black text-white p-2">
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;