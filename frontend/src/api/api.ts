import axios from "axios";

interface LoginResponse{
  token: string;
}

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const registerUser = (email: string, password: string) => {
  return API.post<LoginResponse>("/auth/register", { email, password });
};

export const loginUser = (email: string, password: string) => {
  return API.post("/auth/login", { email, password });
};
