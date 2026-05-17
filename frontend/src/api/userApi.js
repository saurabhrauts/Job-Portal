import API from "./api";

// register
export const registerUser = (data) => {
  return API.post("/user/register", data);
};

// login
export const loginUser = (data) => {
  return API.post("/user/login", data);
};

// update profile
export const updateUser = (data) => {
  return API.put("/user/profile/update", data);
};