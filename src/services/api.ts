import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Envia token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sortepremiada_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Trata token inválido/expirado
api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      // limpa sessão
      localStorage.removeItem("sortepremiada_token");
      localStorage.removeItem("sortepremiada_user");

      // redireciona login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;