"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../lib/api';
import { History as HistoryIcon, Search } from 'lucide-react';
import HistoryCards from '../../components/HistoryCards';

export default function History() {
  const { admin } = useAuth();
  const [captures, setCaptures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaptures = async () => {
      try {
        if (!admin?.token) return;
        const { data } = await API.get('/captures', {
          headers: { Authorization: `Bearer ${admin.token}` }
        });
        setCaptures(data);
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaptures();
  }, [admin]);

  const formatDate = (dateString, full = false) => {
    if (!dateString) return "No Date";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const options = full 
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      : { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (!admin) return null;

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <HistoryIcon className="mr-3 text-blue-600" size={32} />
          Detection History
        </h1>
        <p className="text-gray-500 mt-1">Review all your past classroom captures.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-gray-50/50">
           <div className="relative">
             <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
             <input 
               type="text" 
               placeholder="Search by date..." 
               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
               disabled
             />
           </div>
        </div>

        {loading ? (
             <div className="flex justify-center p-12 flex-1 items-center">
                <div className="animate-pulse space-y-4 w-full">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-xl w-full"></div>
                  ))}
                </div>
              </div>
        ) : captures.length === 0 ? (
           <div className="flex flex-col items-center justify-center text-gray-400 flex-1 p-24">
             <HistoryIcon size={64} className="mb-4 text-gray-200" />
             <p className="text-xl font-medium">No History Found</p>
             <p>Your previous captures will appear here.</p>
           </div>
        ) : (
          <HistoryCards captures={captures} />
        )}
      </div>
    </div>
  );
}
