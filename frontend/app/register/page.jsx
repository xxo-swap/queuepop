"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GuestOnly from "@/components/GeustOnly";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    password: "",
    storeName: "",
    businessType: "",
    phone: "",
    gstNumber: "",
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
      const data = await register(form);

      // business-first routing
      if (!data.user?.accountId) {
        router.push("/pos");
      } else {
        router.push("/pos");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <GuestOnly>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-1">Create your business account</h1>
        <p className="text-sm text-gray-500 mb-6">
          Set up your store to start billing customers
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Owner Info */}
          <div>
            <h3 className="font-semibold mb-2">Owner Details</h3>
            <div className="space-y-3">
              <input
                name="ownerName"
                placeholder="Owner Name"
                className="w-full border rounded-lg p-2"
                value={form.ownerName}
                onChange={handleChange}
                required
              />

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
                type="contact"
                name="contact"
                placeholder="contact"
                className="w-full border rounded-lg p-2"
                value={form.contact}
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
          </div>

          {/* Store Info */}
          <div>
            <h3 className="font-semibold mb-2">Store Details</h3>
            <div className="space-y-3">
              <input
                name="storeName"
                placeholder="Store Name"
                className="w-full border rounded-lg p-2"
                value={form.storeName}
                onChange={handleChange}
                required
              />

              <select
                name="businessType"
                className="w-full border rounded-lg p-2"
                value={form.businessType}
                onChange={handleChange}
                required
              >
                <option value="">Select Business Type</option>
                <option value="Retail Shop">Retail Shop</option>
                <option value="services">Services</option>
                <option value="Restaurant">Restaurant / Cafe</option>
                <option value="Wholesale">Wholesale</option>
              </select>

              <input
                name="gstNumber"
                placeholder="GST Number (optional)"
                className="w-full border rounded-lg p-2"
                value={form.gstNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-2">Address Information</h3>
            <input
              name="Address"
              placeholder="Address"
              className="w-full border rounded-lg p-2"
              value={form.Address}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white rounded-lg p-2 hover:bg-amber-600 disabled:bg-gray-400"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </GuestOnly>
  );
}
