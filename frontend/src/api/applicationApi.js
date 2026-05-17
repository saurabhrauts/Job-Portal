 
import API from "./api";

// APPLY JOB
export const applyJob = (jobId) => {
  return API.post(`/application/apply/${jobId}`);
};

// GET MY APPLICATIONS (STUDENT)
export const getMyApplications = () => {
  return API.get("/application/my-applications");
};

// GET APPLICANTS (RECRUITER)
export const getApplicants = (jobId) => {
  return API.get(`/application/${jobId}`);
};

// UPDATE APPLICATION STATUS (RECRUITER)
export const updateStatus = (id, status) => {
  return API.put(`/application/status/${id}`, { status });
};