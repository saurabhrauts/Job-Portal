import API from "./api";

// CREATE JOB
export const createJob = (data) => {
  return API.post("/job/create", data);
};

// GET ALL JOBS WITH FILTER
export const getAllJobs = (
  keyword = "",
  location = "",
  jobType = ""
) => {

  return API.get(
    `/job/all?keyword=${keyword}&location=${location}&jobType=${jobType}`
  );
};

// GET SINGLE JOB
export const getJobById = (id) => {
  return API.get(`/job/${id}`);
};

// GET RECRUITER JOBS
export const getAdminJobs = () => {
  return API.get("/job/admin-jobs");
};

// UPDATE JOB
export const updateJob = (id, data) => {
  return API.put(`/job/update/${id}`, data);
};

// DELETE JOB
export const deleteJob = (id) => {
  return API.delete(`/job/${id}`);
};