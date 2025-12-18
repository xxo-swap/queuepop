'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 REGISTER user
  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include" // include cookies if backend uses session
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      setUser(data.user || { name, email }); // store user in state
      return data;
    } catch (err) {
      console.error("❌ Register error:", err.message);
      throw err;
    }
  };

  // 🔹 LOGIN user
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setUser(data.user || { email });
      return data;
    } catch (err) {
      console.error("❌ Login error:", err.message);
      throw err;
    }
  };

  // 🔹 LOGOUT user
  const logout = async () => {
    try {
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include"
      });
      setUser(null);
    } catch (err) {
      console.error("❌ Logout error:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Hook to use context easily
export function useAuth() {
  return useContext(AuthContext);
}
