import React from 'react';
import { Camera, Users, TrendingUp, TrendingDown } from 'lucide-react';

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
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-105">
        <div>
          <p className="text-sm font-medium text-gray-500">Total Captures (Week)</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{thisWeekCaptures}</p>
        </div>
        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
          <Camera className="w-8 h-8" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-105">
        <div>
          <p className="text-sm font-medium text-gray-500">Average Students</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">{avgStudents}</p>
        </div>
        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
          <Users className="w-8 h-8" />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-105">
        <div>
          <p className="text-sm font-medium text-gray-500">Highest Capture</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{highestCapture}</p>
        </div>
        <div className="p-4 bg-green-50 text-green-600 rounded-xl">
          <TrendingUp className="w-8 h-8" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-105">
        <div>
          <p className="text-sm font-medium text-gray-500">Lowest Capture</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{lowestCapture}</p>
        </div>
        <div className="p-4 bg-red-50 text-red-600 rounded-xl">
          <TrendingDown className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};
export default DashboardCards;
