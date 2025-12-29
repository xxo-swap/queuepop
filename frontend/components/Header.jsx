"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center h-[80px] px-6 bg-teal-700">
      <div className="text-3xl font-bold">
      <span className="text-teal-100">Queue</span><span className="text-teal-200">Pop</span> 
      </div>

      <div>
        {user ? (
          <button
            onClick={logout}
            className="text-lg px-4 py-2 bg-black text-white rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="text-lg px-4 py-2 bg-teal-900 text-teal-100 rounded">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
