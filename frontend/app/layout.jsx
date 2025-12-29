import './globals.css';
import { DM_Sans } from "next/font/google";
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-dm-sans",
});

import { AuthProvider } from '../components/AuthProvider'; 
import Header from '@/components/Header'
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <Header></Header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
