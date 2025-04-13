import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(null); // null = đang check

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLogin(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
