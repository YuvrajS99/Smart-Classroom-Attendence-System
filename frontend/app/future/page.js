import React from 'react';
import { Camera, AlertTriangle, BarChart3, ScanFace, Download, LayoutDashboard } from 'lucide-react';

export default function FutureDevelopment() {
  const features = [
    {
      title: "Real-Time Student Detection",
      description: "Live updating counter while camera runs.",
      icon: Camera,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      example: (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Students Detected:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg">5</span>
        </div>
      )
    },
    {
      title: "Classroom Capacity Warning",
      description: "Automated alert configurations to notify administrators if classroom occupancy exceeds capacity.",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      example: (
        <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-red-700 font-medium">Class Capacity:</span>
            <span className="text-red-900 font-bold">40</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-700 font-medium">Detected Students:</span>
            <span className="text-red-900 font-bold">45</span>
          </div>
          <div className="pt-2 border-t border-red-200 text-xs font-bold text-red-600 flex items-center justify-center gap-1">
             <AlertTriangle size={14} />
             ⚠ Overcrowded Classroom Alert
          </div>
        </div>
      )
    },
    {
      title: "Attendance Analytics Dashboard",
      description: "Charts showing weekly attendance, monthly attendance, and average classroom occupancy.",
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      example: (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
           <div className="h-16 w-full flex items-end gap-2 text-purple-200">
              <div className="w-1/4 bg-purple-200 rounded-t-md h-1/2"></div>
              <div className="w-1/4 bg-purple-300 rounded-t-md h-3/4"></div>
              <div className="w-1/4 bg-purple-400 rounded-t-md h-full"></div>
              <div className="w-1/4 bg-purple-500 rounded-t-md h-4/5"></div>
           </div>
           <p className="text-xs text-center text-gray-500 mt-2 font-medium">Recharts Integration</p>
        </div>
      )
    },
    {
      title: "AI Face Recognition",
      description: "Identify individual students rather than only counting faces.",
      icon: ScanFace,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      example: (
         <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center text-sm font-medium text-emerald-800">
           Facial Signature Mapping Database
         </div>
      )
    },
    {
      title: "Attendance Report Export",
      description: "Allow teachers to download attendance reports as CSV or PDF.",
      icon: Download,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      example: (
         <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-200 text-center">Export CSV</button>
            <button className="flex-1 py-2 bg-rose-100 text-rose-700 rounded-lg text-sm font-bold border border-rose-200 text-center">Export PDF</button>
         </div>
      )
    },
    {
      title: "Multi-Classroom Monitoring",
      description: "Allow admins to monitor multiple classrooms from one dashboard.",
      icon: LayoutDashboard,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      example: (
         <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-gray-100 h-10 rounded-md border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">Room A</div>
            <div className="bg-gray-100 h-10 rounded-md border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">Room B</div>
            <div className="bg-gray-100 h-10 rounded-md border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">Room C</div>
            <div className="bg-gray-100 h-10 rounded-md border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">Room D</div>
         </div>
      )
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Future Development Roadmap
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Upcoming features and scaling improvements planned for the SmartAttendence platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">Feature {idx + 1}:<br/>{item.title}</h3>
            </div>
            
            <p className="text-gray-600 text-sm flex-1 mb-4">
              {item.description}
            </p>
            
            <div className="mt-auto">
              {item.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
