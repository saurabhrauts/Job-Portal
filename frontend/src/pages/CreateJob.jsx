import { useEffect, useState } from "react";
import { createJob } from "../api/jobApi";
import { getCompanies } from "../api/companyApi";
import { useNavigate } from "react-router-dom";

function CreateJob() {

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    companyId: ""
  });

  // input change
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // get companies for dropdown
  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res.data.companies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // submit job
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createJob(input);

      alert(res.data.message);

      // reset form
      setInput({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        position: "",
        companyId: ""
      });

      navigate("/jobs");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-2xl font-bold mb-6">
        Create Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={input.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={input.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Requirements */}
        <input
          type="text"
          name="requirements"
          placeholder="Requirements"
          value={input.requirements}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Salary */}
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={input.salary}
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

        {/* Job Type */}
        <input
          type="text"
          name="jobType"
          placeholder="Job Type (Full-time / Part-time)"
          value={input.jobType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Position */}
        <input
          type="text"
          name="position"
          placeholder="Position (e.g. 2 openings)"
          value={input.position}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Company Dropdown */}
        <select
          name="companyId"
          value={input.companyId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Job
        </button>

      </form>

    </div>
  );
}

export default CreateJob;