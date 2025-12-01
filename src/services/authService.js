import api from "./api";
import { setAccessToken, setRefreshToken, setUser, getRefreshToken, clearStorage } from "../utils/storage";

const ENDPOINTS = {
  LOGIN: "/auth/jwt/create/",
  REGISTER: "/auth/users/",
  ME: "/auth/users/me/",
  REFRESH: "/auth/jwt/refresh/",
};

export const login = async (username, password) => {
  const res = await api.post(ENDPOINTS.LOGIN, { username, password });
  const { access, refresh } = res.data;
  setAccessToken(access);
  setRefreshToken(refresh);

  const userRes = await api.get(ENDPOINTS.ME);
  setUser(userRes.data);
  return userRes.data;
};

export const register = async (username, email, password, re_password) => {
  const res = await api.post(ENDPOINTS.REGISTER, { username, email, password, re_password });
  return res.data;
};

export const refreshAuthToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const res = await api.post(ENDPOINTS.REFRESH, { refresh });
  const { access, refresh: newRefresh } = res.data;
  if (access) setAccessToken(access);
  if (newRefresh) setRefreshToken(newRefresh);
  return { access, refresh: newRefresh };
};

export const logout = async () => {
  clearStorage();
};
