"use client";
import './globals.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const LayoutContent = ({ children }) => {
  const { admin, loading } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Exclude login/register page from requiring a sidebar
  const isAuthPage = pathname === '/' || pathname === '/register';

  // Prevent background scrolling when mobile menu expands
  useEffect(() => {
    if (isSidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isSidebarOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {!isAuthPage && admin && <Topbar onMenuClick={() => setIsSidebarOpen(true)} />}
      {!isAuthPage && admin && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      
      <main className={`flex-1 w-full transition-all duration-300 ${!isAuthPage && admin ? 'md:ml-64' : ''}`}>
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
