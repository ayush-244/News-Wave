import React, { createContext, useContext, useState, useEffect } from "react";
import { GoogleCredentialResponse } from "@react-oauth/google";

interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  isAdmin: boolean;
  provider?: "email" | "google";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credentialResponse: GoogleCredentialResponse) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Password validation (simple)
      if (!email || !password || password.length < 6) {
        throw new Error("Invalid credentials");
      }

      // Determine if admin based on email
      const isAdmin = email === "admin@newswave.com" && password === "admin123";
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        isAdmin,
        provider: "email",
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (credentialResponse: GoogleCredentialResponse) => {
    setIsLoading(true);
    try {
      // Decode Google JWT token
      const token = credentialResponse.credential;
      
      if (!token) {
        throw new Error("No credential received from Google");
      }

      // In production, you should verify this token on your backend
      // For now, decode it on the client (less secure, but works for demo)
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const googleUser = JSON.parse(jsonPayload);

      const newUser: User = {
        id: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        isAdmin: false, // Google users are never admin by default
        provider: "google",
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
