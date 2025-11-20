"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  role: "participante" | "organizador" | "admin";
  profilePhoto?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("sigea_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("sigea_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual API call
    const mockUser: User = {
      id: "1",
      nombre: "Usuario",
      apellido: "Prueba",
      email: email,
      telefono: "987654321",
      dni: "12345678",
      role: "participante",
      profilePhoto: "👤",
    };

    localStorage.setItem("sigea_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (
    userData: Partial<User> & { password: string }
  ) => {
    // TODO: Implement actual API call
    const newUser: User = {
      id: Math.random().toString(36),
      nombre: userData.nombre || "",
      apellido: userData.apellido || "",
      email: userData.email || "",
      telefono: userData.telefono || "",
      dni: userData.dni || "",
      role: "participante",
      profilePhoto: "👤",
    };

    localStorage.setItem("sigea_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("sigea_user");
    setUser(null);
  };

  const loginWithGoogle = async () => {
    // TODO: Implement Google OAuth
    const mockUser: User = {
      id: Math.random().toString(36),
      nombre: "Usuario",
      apellido: "Google",
      email: "usuario@gmail.com",
      telefono: "987654321",
      dni: "12345678",
      role: "participante",
      profilePhoto: "👤",
    };

    localStorage.setItem("sigea_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    localStorage.setItem("sigea_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
