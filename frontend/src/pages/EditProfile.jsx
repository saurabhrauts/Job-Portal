import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { updateUser } from "../api/userApi";

//  REDUX
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../redux/authSlice";

function EditProfile() {

  const navigate = useNavigate();

  //  DISPATCH
  const dispatch = useDispatch();

  //  USER FROM REDUX
  const user = useSelector(
    (state) => state.auth.user
  );

  // STATE
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || ""
  });

  // INPUT CHANGE
  const handleChange = (e) => {

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

  };

  // UPDATE PROFILE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const updatedData = {

        ...input,

        // STRING → ARRAY
        skills: input.skills
          .split(",")
          .map((s) => s.trim())

      };

      const res = await updateUser(updatedData);

      console.log(res.data);

      //  UPDATE LOCALSTORAGE
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      //  UPDATE REDUX
      dispatch(setUser(res.data.user));

      alert("Profile Updated Successfully");

      //  REDIRECT
      navigate("/profile");

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message
      );

    }
  };

  return (

    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-2xl font-bold mb-6">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* FULLNAME */}
        <input
          type="text"
          name="fullname"
          value={input.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />

        {/* PHONE */}
        <input
          type="text"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />

        {/* BIO */}
        <input
          type="text"
          name="bio"
          value={input.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border p-2 rounded"
        />

        {/* SKILLS */}
        <input
          type="text"
          name="skills"
          value={input.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
        />

        {/* BUTTON */}
        <button className="bg-black text-white px-4 py-2 rounded">

          Update Profile

        </button>

      </form>

    </div>
  );
}

export default EditProfile;