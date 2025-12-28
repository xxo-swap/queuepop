"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL; // <- use the Vercel env variable

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
    console.log("caling auth/me")
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data.data.user); // must include accountId
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (payload) => {
    const res = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    console.log(data);
    setUser(data.data.user);

    return data;
  };

  const register = async (payload) => {
    const res = await fetch("http://localhost:4000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await fetch("http://localhost:4000/api/v1/auth/logout", {
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
