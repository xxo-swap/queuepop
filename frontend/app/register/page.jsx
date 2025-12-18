'use client';

import { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register } = useAuth();  // useAuth hook from AuthProvider
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handle(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register({ name, email, password }); // calls backend via AuthProvider
      router.push('/pos'); // redirect after successful registration
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form onSubmit={handle} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-amber-500 text-white p-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-2 text-sm">
        Already have an account?{' '}
        <a href="/" className="text-blue-600">
          Login
        </a>
      </p>
    </div>
  );
}
