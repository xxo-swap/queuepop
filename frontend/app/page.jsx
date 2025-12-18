'use client';
import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";


export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handle(e) {
    e.preventDefault();
    // 🔌 replace with backend login later
    await login({ email, password });
    router.push('/pos');
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <Header></Header>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handle} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-amber-500 text-white p-2 rounded">Login</button>
      </form>
      <p className="mt-2 text-sm">Don’t have an account? <a href="/register" className="text-blue-600">Register</a></p>
    </div>
  );
}
