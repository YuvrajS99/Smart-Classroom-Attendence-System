"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Camera, History, User, LogOut, X, Info, Rocket } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { logout, admin } = useAuth();

  if (!admin) return null; // Only show auth sidebar to logged in users

  const appNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Capture Classroom', path: '/capture', icon: <Camera size={20} /> },
    { name: 'Detection History', path: '/history', icon: <History size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const globalNavItems = [
    { name: 'About', path: '/about', icon: <Info size={20} /> },
    { name: 'Future Development', path: '/future', icon: <Rocket size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform z-50 flex flex-col lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-wide">
              Menu
            </h1>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-900 transition p-1 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 flex flex-col hide-scrollbar bg-white text-gray-800">
          
          <nav>
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Applications</p>
            <ul className="space-y-1 block">
              {appNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                        ? 'bg-blue-50 text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600 transition-colors'}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav>
            <div className="h-px bg-gray-100 my-4 mx-4"></div>
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Global</p>
            <ul className="space-y-1 block">
              {globalNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                        ? 'bg-blue-50 text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600 transition-colors'}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 group mt-auto">
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="flex items-center justify-center gap-3 text-red-600 hover:text-white hover:bg-red-600 w-full px-4 py-3 rounded-xl transition-all border border-red-100 group-hover:border-transparent bg-white shadow-sm"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
