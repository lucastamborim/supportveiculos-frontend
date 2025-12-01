export const setAccessToken = (token) => localStorage.setItem("accessToken", token);
export const getAccessToken = () => localStorage.getItem("accessToken");
export const removeAccessToken = () => localStorage.removeItem("accessToken");

export const setRefreshToken = (token) => localStorage.setItem("refreshToken", token);
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const removeRefreshToken = () => localStorage.removeItem("refreshToken");

export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const removeUser = () => localStorage.removeItem("user");

export const clearStorage = () => {
  removeAccessToken();
  removeRefreshToken();
  removeUser();
};
