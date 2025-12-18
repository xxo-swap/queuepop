"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/menu", {
          credentials: "include", // important for auth cookies
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load menu");
        setMenu(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <p className="text-center p-4">Loading menu...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Menu</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">₹ {item.price}</p>
            {item.available ? (
              <span className="text-green-600 text-sm">Available</span>
            ) : (
              <span className="text-red-500 text-sm">Not available</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
