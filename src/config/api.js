import axios from "axios";

const iLinkAPI = axios.create({
  // baseURL: "https://ilink-server-new.herokuapp.com",
  // baseURL: "https://ilink-server.onrender.com",
  baseURL: "http://localhost:4000",
});

iLinkAPI.interceptors.request.use((req) => {
  // send the token in the request
  const token = sessionStorage.getItem("token");

  // Authorization -> Bearer token -> paste the token in postman
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default iLinkAPI;
