import axios from "axios";

// base URL
const API = axios.create({

  baseURL: "http://localhost:8000/api/v1",

  withCredentials: true

});

// export API
export default API;