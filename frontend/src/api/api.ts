import axios from "axios";

interface LoginResponse {
  token: string;
}

interface LoginFamilyResponse {
  token: string;
}

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.VITE_APP_API_URL
      : "http://localhost:3000/api/v1",
});

export const registerUser = (email: string, password: string) => {
  return API.post(
    "/auth/register",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const loginUser = (email: string, password: string) => {
  return API.post<LoginResponse>("/auth/login", { email, password });
};

export const loginFamily = (code: string) => {
  return API.post<LoginFamilyResponse>("/auth/family-login", { code });
};

// Task endpoints

export const createTask = (data: {
  title: string;
  description?: string;
  userId: string;
}) => {
  return API.post("/tasks", data);
};

export const updateTask = (
  id: string,
  data: { title?: string; description?: string }
) => {
  return API.put(`/tasks/${id}`, data);
};

export const deleteTask = (id: string) => {
  return API.delete(`/tasks/${id}`);
};
