import axios from "axios";

// base URL
const API = axios.create({

  baseURL: "https://job-portal-ftxy.onrender.com/api/v1",

  withCredentials: true

});

// export API
export default API;