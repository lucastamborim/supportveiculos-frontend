export const setAccessToken = (token) => localStorage.setItem("accessToken", token);
export const getAccessToken = () => localStorage.getItem("accessToken");
export const removeAccessToken = () => localStorage.removeItem("accessToken");

export const setRefreshToken = (token) => localStorage.setItem("refreshToken", token);
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const removeRefreshToken = () => localStorage.removeItem("refreshToken");

export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Erro ao parsear usuário do storage:", e);
    return null;
  }
};
export const removeUser = () => localStorage.removeItem("user");

export const clearStorage = () => {
  try {
    removeAccessToken();
    removeRefreshToken();
    removeUser();
  } catch (e) {
    console.error("Erro ao limpar storage:", e);
  }
};
