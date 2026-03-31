"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, Info, Rocket, LayoutDashboard, Camera, History, User } from 'lucide-react';

const Navbar = ({ onMenuClick, isOpen }) => {
  const pathname = usePathname();
  const { logout, admin } = useAuth();

  const appNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Capture Classroom', path: '/capture', icon: <Camera size={18} /> },
    { name: 'Detection History', path: '/history', icon: <History size={18} /> },
    { name: 'Profile', path: '/profile', icon: <User size={18} /> },
  ];

  const globalNavItems = [
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Future Development', path: '/future', icon: <Rocket size={18} /> },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-40 transition-all">
      <div className="flex items-center">
        {admin && (
          <button
            onClick={onMenuClick}
            className="lg:hidden mr-4 p-2 bg-gray-50 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Menu size={24} />
          </button>
        )}
        <Link href={admin ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">S</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-wide hidden sm:block">
            SmartAttendence
          </h1>
        </Link>
      </div>

      <div className="flex items-center">
        {admin ? (
          <>
            <div className="hidden lg:flex items-center space-x-6 mr-6 border-r border-gray-200 pr-6">
              {[...appNavItems, ...globalNavItems].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname === link.path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className="hidden xl:block">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                {admin.name}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-6">
              {globalNavItems.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname === link.path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            {pathname !== '/' && pathname !== '/register' && (
              <Link
                href="/"
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
