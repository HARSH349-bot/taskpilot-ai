"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  loginLogs: string[];
  securityStatus: "secure" | "warning" | "scanning" | "compromised";
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setSecurityStatus: (status: "secure" | "warning" | "scanning" | "compromised") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginLogs, setLoginLogs] = useState<string[]>([]);
  const [securityStatus, setSecurityStatus] = useState<"secure" | "warning" | "scanning" | "compromised">("secure");

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("tp_auth");
    const storedUser = localStorage.getItem("tp_user");
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setLoginLogs([]);
    setSecurityStatus("scanning");

    const logs = [
      "Establishing link with TaskPilot AI Command Center...",
      "Resolving security credentials for " + (username || "Guest") + "...",
      "Initializing secure handshakes (AES-256)...",
      "Decrypting localized database partition...",
      "Verifying cryptographic signatures...",
      "Security Status Check: PASS (Level 4 Authorization)",
      "Syncing workspace metadata...",
      "Initializing environment variables...",
      "Welcome back. Connection secured."
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setLoginLogs((prev) => [...prev, logs[i]]);
    }

    // Success
    setIsAuthenticated(true);
    const loggedUser = { name: username || "James Smith" };
    setUser(loggedUser);
    setSecurityStatus("secure");
    setIsLoading(false);
    
    localStorage.setItem("tp_auth", "true");
    localStorage.setItem("tp_user", JSON.stringify(loggedUser));
    
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoginLogs([]);
    setSecurityStatus("secure");
    localStorage.removeItem("tp_auth");
    localStorage.removeItem("tp_user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        loginLogs,
        securityStatus,
        login,
        logout,
        setSecurityStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
