"use client";
import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line
} from 'recharts';

const AttendanceCharts = ({ captures }) => {
  const chartData = useMemo(() => {
    if (!captures?.length) return { weekly: [], monthly: [] };

    const weeklyData = {};
    const monthlyData = {};

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const now = new Date();

    const sortedCaptures = [...captures].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    sortedCaptures.forEach(c => {
      if (!c.createdAt) return;
      const d = new Date(c.createdAt);
      if (isNaN(d.getTime())) return;
      
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Group weekly
      if (d >= oneWeekAgo) {
        if (!weeklyData[dateStr]) weeklyData[dateStr] = { date: dateStr, maxStudents: 0 };
        weeklyData[dateStr].maxStudents = Math.max(weeklyData[dateStr].maxStudents, c.studentCount || 0);
      }

      // Group monthly
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        if (!monthlyData[dateStr]) monthlyData[dateStr] = { date: dateStr, maxStudents: 0 };
        monthlyData[dateStr].maxStudents = Math.max(monthlyData[dateStr].maxStudents, c.studentCount || 0);
      }
    });

    return {
      weekly: Object.values(weeklyData),
      monthly: Object.values(monthlyData)
    };
  }, [captures]);

  if (!captures?.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Past 7 Days (Peak Attendance)</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.weekly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="maxStudents" name="Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Current Month Trend</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.monthly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="maxStudents" name="Students" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default AttendanceCharts;
