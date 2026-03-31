"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Camera, History, User, LogOut, X, Info, Rocket } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { logout } = useAuth();

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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-gray-800 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">S</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
              SmartAttendence
            </h1>
          </div>
          <button 
            className="lg:hidden text-gray-400 hover:text-white transition p-1 bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Desktop Header */}
        <div className="p-6 hidden lg:flex items-center gap-3 border-b border-gray-800">
           <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-lg leading-none">S</span>
           </div>
           <span className="text-lg font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-wide">Admin panel</span>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 flex flex-col hide-scrollbar">
          
          <nav>
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Applications</p>
            <ul className="space-y-1">
              {appNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-400 transition-colors'}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className="lg:hidden">
            <div className="h-px bg-gray-800 my-4 mx-4"></div>
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Global</p>
            <ul className="space-y-1">
              {globalNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-400 transition-colors'}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-800 lg:hidden group">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-3 text-red-400 hover:text-white hover:bg-red-600 w-full px-4 py-3 rounded-xl transition-all border border-gray-800 group-hover:border-red-500/30"
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
