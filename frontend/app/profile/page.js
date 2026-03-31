"use client";
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { admin } = useAuth();

  if (!admin) return null;

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 max-w-lg w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="relative z-10">
          <div className="w-32 h-32 bg-white rounded-full mx-auto p-2 mb-6 shadow-md border-4 border-white backdrop-blur-sm">
             <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                 <User className="text-blue-500 w-16 h-16" />
             </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900">{admin.name}</h1>
          <p className="text-blue-600 font-medium mb-8 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 mr-1" />
            System Administrator
          </p>
          
          <div className="space-y-4">
             <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-100">
               <Mail className="w-5 h-5 text-gray-400 mr-3" />
               <span className="text-gray-700 font-medium">{admin.email}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
