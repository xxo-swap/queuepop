"use client";

import { useAuth } from "../../components/AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GuestOnly from "@/components/GeustOnly";

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      router.push("/pos");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (

    <GuestOnly>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to manage your billing and sales
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg p-2"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded-lg p-2"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have a business account?{" "}
          <Link href="/register" className="text-blue-600">
            Create one
          </Link>
        </p>
      </div>
    </div>
    </GuestOnly>
  );
}
