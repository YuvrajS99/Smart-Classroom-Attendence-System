"use client";
import './globals.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ToastProvider, useToast } from '../context/ToastContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const LayoutContent = ({ children }) => {
  const { admin, loading } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Exclude login/register page from requiring navigation
  const isAuthPage = pathname === '/' || pathname === '/register';

  // Prevent background scrolling when mobile menu expands
  useEffect(() => {
    if (isSidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isSidebarOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 border-t-transparent shadow-lg shadow-blue-600/20"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen w-full relative">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 w-full mx-auto max-w-7xl flex flex-col">
          {children}
      </main>
        
      <Footer />
    </div>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
