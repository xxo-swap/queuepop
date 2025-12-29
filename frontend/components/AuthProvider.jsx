"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_BASE;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (payload) => {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUser(data.data.user);
    return data;
  };

  const register = async (payload) => {
    const res = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUser(data.data.user);
    return data;
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
