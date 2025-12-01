import axios from "axios";
import { getAccessToken, setAccessToken, getRefreshToken } from "../utils/storage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: `${BACKEND_URL.replace(/\/$/, "")}/api`,
});

// Interceptor de requisição: adiciona token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta: trata 401 e tenta refresh do token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se for 401 e ainda não tentou refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          return Promise.reject(error);
        }

        // Tenta renovar o token
        const response = await axios.post(
          `${BACKEND_URL.replace(/\/$/, "")}/api/auth/jwt/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;
        if (access) {
          setAccessToken(access);
          // Usa o novo token na requisição original
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
        // Limpar storage e redirecionar para login será feito pelo AuthContext
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
