"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Preloader from "@/components/Preloader/Preloader";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || loading) return;
    router.replace(user ? "/pos" : "/login");
  }, [ready, loading, user]);

  if (!ready) return <Preloader onDone={() => setReady(true)} />;

  return null;
}
