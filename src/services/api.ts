// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// ✅ Lê o token a cada requisição — nunca fica desatualizado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sortepremiada_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;