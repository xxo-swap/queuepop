'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (!user) {
      router.push('/login'); // redirect if not logged in
    }
  }, [user, router]);

  if (!user) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  return <>{children}</>;
}
