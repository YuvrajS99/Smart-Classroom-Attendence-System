"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Camera, History, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Capture Classroom', path: '/capture', icon: <Camera size={20} /> },
    { name: 'Detection History', path: '/history', icon: <History size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col hidden md:flex fixed top-0 left-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400">SmartAttendence</h1>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="mb-2">
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-6 py-3 transition-colors ${
                    isActive ? 'bg-blue-600 text-white border-r-4 border-blue-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-6">
        <button
          onClick={logout}
          className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 w-full px-4 py-3 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
