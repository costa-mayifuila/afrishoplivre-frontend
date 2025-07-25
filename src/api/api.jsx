import axios from "axios";

// Em Vite: variáveis que começam com VITE_ ficam disponíveis em import.meta.env
// Crie em .env.local e no Vercel o VITE_API_URL adequado:
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
