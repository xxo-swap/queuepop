"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center h-[100px] px-6 bg-amber-400">
      <div className="text-3xl font-bold">
        logo
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
            <button className="text-lg px-4 py-2 bg-black text-white rounded">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
