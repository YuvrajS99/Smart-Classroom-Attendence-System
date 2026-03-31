"use client";
import './globals.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// We need an inner layout component to use hooks like useAuth
const LayoutContent = ({ children }) => {
  const { admin, loading } = useAuth();
  const pathname = usePathname();
  
  // Exclude login/register page from requiring a sidebar
  const isAuthPage = pathname === '/' || pathname === '/register';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {!isAuthPage && admin && <Sidebar />}
      
      <main className={`flex-1 ${!isAuthPage && admin ? 'md:ml-64' : ''}`}>
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
