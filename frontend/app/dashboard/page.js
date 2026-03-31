"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import API from '../../lib/api';
import { Users, Camera, Activity, Calendar, RefreshCcw } from 'lucide-react';
import DashboardCards from '../../components/DashboardCards';
import AttendanceCharts from '../../components/AttendanceCharts';

export default function Dashboard() {
  const { admin } = useAuth();
  const { addToast } = useToast();
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
        console.error('Failed to fetch captures', error);
        addToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCaptures();
  }, [admin, addToast]);

  const formatDate = (dateString) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (!admin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Welcome back, {admin.name}</h1>
          <p className="text-gray-500 mt-1">Here is the latest snapshot of your classroom attendence.</p>
        </div>
        {!loading && (
          <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm font-medium text-sm disabled:opacity-50">
            <RefreshCcw size={16} />
            Refresh
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-8">
          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[150px]">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-200 animate-pulse"></div>
                  <div className="w-20 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div>
                  <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts Skeleton */}
          <div className="w-full h-96 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="flex-1 w-full flex items-end justify-between gap-4">
               {[...Array(7)].map((_, i) => (
                 <div key={i} className="w-full bg-gray-100 rounded-t-lg animate-pulse" style={{ height: `${Math.random() * 60 + 20}%`}}></div>
               ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <DashboardCards captures={captures} />
          
          <AttendanceCharts captures={captures} />

          {/* Recent History */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-8">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Recent Captures</h2>
            </div>
            {captures.length === 0 ? (
               <div className="py-16 px-6 flex flex-col items-center justify-center text-gray-400">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Camera size={32} className="text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-medium text-lg mb-1">No captures found yet</h3>
                <p className="text-sm">Start by capturing the classroom from the camera tab!</p>
               </div>
            ) : (
              <div className="overflow-x-auto hide-scrollbar">
                <table className="min-w-full divide-y divide-gray-100 border-collapse">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Detected Count</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tr-3xl">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {captures.slice(0, 5).map((capture) => (
                      <tr key={capture._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2.5 text-blue-500" />
                            {formatDate(capture.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                            {capture.studentCount} Students
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap items-center">
                          <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-gray-200 group-hover:border-blue-300 transition-colors shadow-sm">
                            <img 
                              src={capture.imageUrl} 
                              alt="Capture Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
