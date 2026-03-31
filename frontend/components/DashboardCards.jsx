import React from 'react';
import { Camera, Users, TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

const DashboardCards = ({ captures }) => {
  const totalCaptures = captures?.length || 0;
  
  let avgStudents = 0;
  let highestCapture = 0;
  let lowestCapture = 0;
  let thisWeekCaptures = 0;

  if (totalCaptures > 0) {
    const counts = captures.map(c => c.studentCount || 0);
    avgStudents = Math.round(counts.reduce((a, b) => a + b, 0) / totalCaptures);
    highestCapture = Math.max(...counts);
    lowestCapture = Math.min(...counts);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    thisWeekCaptures = captures.filter(c => {
      const d = new Date(c.createdAt);
      return !isNaN(d.getTime()) && d >= oneWeekAgo;
    }).length;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">+12% vs last week</span>
        </div>
        <div className="relative z-10">
          <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{thisWeekCaptures}</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Total Captures (Week)</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">Avg / Class</span>
        </div>
        <div className="relative z-10">
          <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{avgStudents}</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Average Students</p>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Peak Occupancy</span>
        </div>
        <div className="relative z-10">
          <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{highestCapture}</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Highest Capture</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-colors"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            <TrendingDown className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">Lowest</span>
        </div>
        <div className="relative z-10">
          <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{lowestCapture}</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Lowest Capture</p>
        </div>
      </div>
    </div>
  );
};
export default DashboardCards;
