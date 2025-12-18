import './globals.css';
import { AuthProvider } from '../components/AuthProvider'; // ✅ named import
import {header} from '@/components/Header'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <header></header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
