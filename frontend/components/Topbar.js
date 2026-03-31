"use client";
import React from 'react';
import { Menu } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  return (
    <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4 sticky top-0 z-40 shadow-sm">
      <h1 className="text-xl font-bold text-blue-400 tracking-wide">SmartAttendence</h1>
      <button 
        onClick={onMenuClick} 
        className="p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition"
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Topbar;
