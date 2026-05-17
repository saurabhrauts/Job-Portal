import API from "./api";

// create company
export const createCompany = (data) => {
  return API.post("/company/create", data);
};

// get my companies
export const getCompanies = () => {
  return API.get("/company/get");
};

// get single company
export const getCompanyById = (id) => {
  return API.get(`/company/${id}`);
};

// update company
export const updateCompany = (id, data) => {
  return API.put(`/company/${id}`, data);
};