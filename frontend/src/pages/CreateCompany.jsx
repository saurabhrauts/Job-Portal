import { useState } from "react";
import { createCompany } from "../api/companyApi";
import { useNavigate } from "react-router-dom";

function CreateCompany() {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: ""
  });

  // input change
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // submit company
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createCompany(input);

      alert(res.data.message);

      // clear form
      setInput({
        name: "",
        description: "",
        website: "",
        location: ""
      });

      // redirect to my companies page
      navigate("/create-job");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-2xl font-bold mb-6">
        Create Company
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company Name */}
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={input.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Website */}
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={input.website}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={input.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Company
        </button>

      </form>

    </div>
  );
}

export default CreateCompany;