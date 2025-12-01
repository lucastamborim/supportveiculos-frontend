/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState, useContext } from "react";
import { getAccessToken, getUser, clearStorage } from "../utils/storage";
import { refreshAuthToken } from "../services/authService";
import api from "../services/api";

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

    // Adiciona interceptor de resposta para limpar auth ao falhar refresh
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && error.config._retry) {
          // Se tentou refresh e falhou, limpa storage
          clearStorage();
          setIsAuthenticated(false);
          setUserState(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const checkAuth = async () => {
    const refreshed = await refreshAuthToken();
    if (refreshed) setIsAuthenticated(true);
    else {
      clearStorage();
      setIsAuthenticated(false);
      setUserState(null);
    }
  };

  const signOut = async () => {
    clearStorage();
    setIsAuthenticated(false);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, checkAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
