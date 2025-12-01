import React, { createContext, useEffect, useState, useContext } from "react";
import { getAccessToken, getUser, removeAccessToken, removeRefreshToken, removeUser } from "../utils/storage";
import { refreshAuthToken } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setIsAuthenticated(false);
          setUserState(null);
          setIsLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUserState(getUser());
      } catch {
        setIsAuthenticated(false);
        setUserState(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const checkAuth = async () => {
    const refreshed = await refreshAuthToken();
    if (refreshed) setIsAuthenticated(true);
    else {
      setIsAuthenticated(false);
      setUserState(null);
    }
  };

  const signOut = async () => {
    removeAccessToken();
    removeRefreshToken();
    removeUser();
    setIsAuthenticated(false);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setUserState, isAuthenticated, setIsAuthenticated, isLoading, checkAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
