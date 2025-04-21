import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import apiClient from "../../services/api-client";
import { User } from "../Admin Dashboard/Types/User";
import { Server_Url } from "../Main/root";

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post("Login/", {
        username,
        password,
        language: "E",
      });

      const newToken = response?.data?.token;
      const userTypes = response?.data?.data?.user_types;

      if (newToken && userTypes) {
        const isAdmin = userTypes.includes("admin");

        setToken(newToken);
        setIsAdmin(isAdmin);

        localStorage.setItem("token", newToken);
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
      } else {
        console.error(
          "Token or user types missing in response:",
          response.data
        );
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [token]);
  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
