"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Users, Camera, Activity, Calendar } from 'lucide-react';
import { format } from 'date-fns'; // Make sure to install or use native Intl.DateTimeFormat
// Using native Intl for simplicity, no date-fns needed natively right now

export default function Dashboard() {
  const { admin } = useAuth();
  const [captures, setCaptures] = useState([]);
  const [stats, setStats] = useState({
    totalCaptures: 0,
    latestStudents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaptures = async () => {
      try {
        if (!admin?.token) return;
        const { data } = await axios.get('http://localhost:5000/api/captures', {
          headers: { Authorization: `Bearer ${admin.token}` }
        });

        setCaptures(data);
        
        setStats({
          totalCaptures: data.length,
          latestStudents: data[0]?.studentCount || 0
        });

      } catch (error) {
        console.error('Failed to fetch captures', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaptures();
  }, [admin]);

  const formatDate = (dateString) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (!admin) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {admin.name}</h1>
        <p className="text-gray-500 mt-1">Here is the latest snapshot of your classroom attendence.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-24 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Captures</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCaptures}</p>
              </div>
              <div className="p-4 bg-blue-50 bg-opacity-50 rounded-xl">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Latest Students Detected</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.latestStudents}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">System Status</p>
                <p className="text-xl font-bold text-gray-900 mt-1">Online</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Recent Captures</h2>
            </div>
            {captures.length === 0 ? (
               <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                <Camera size={48} className="mb-4 text-gray-300" />
                <p>No captures found yet. Start by capturing the classroom!</p>
               </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detected Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {captures.slice(0, 5).map((capture) => (
                      <tr key={capture._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(capture.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {capture.studentCount} Students
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={capture.imageUrl} 
                            alt="Capture Preview" 
                            className="h-12 w-20 object-cover rounded-lg border border-gray-200"
                          />
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
