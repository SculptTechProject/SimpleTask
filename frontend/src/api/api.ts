import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const registerUser = (email: string, password: string) => {
  return API.post("/auth/register", { email, password });
};

const loginUser = (email: string, password: string) => {
  return API.post("/auth/login", { email, password });
};
