"use client";
import React from 'react';
import { Rocket, Activity, AlertTriangle, UserCheck, FileText, Brain } from 'lucide-react';
import RoadmapCard from '../../components/RoadmapCard';

export default function FutureDevelopment() {
  const roadmapItems = [
    {
      title: "Real-time Student Detection Counter",
      description: "Live updating counters showing real-time presence in the classroom using WebSockets and continuous webcam inference.",
      icon: Activity,
      status: "In Progress",
      upcoming: true
    },
    {
      title: "Attendance Analytics Dashboard",
      description: "Deep dive metrics into student attendance trends over weeks or semesters, visualized in rich, interactive charts.",
      icon: Rocket,
      status: "Planning",
      upcoming: false
    },
    {
      title: "Classroom Capacity Alert System",
      description: "Automated alert configurations to notify administrators if a classroom occupancy drops below or exceeds certain thresholds.",
      icon: AlertTriangle,
      status: "Planning",
      upcoming: false
    },
    {
      title: "Face Recognition Attendance",
      description: "Upgrading from anonymous counting to personalized attendance tracking by registering student facial signatures into the database.",
      icon: UserCheck,
      status: "Future",
      upcoming: false
    },
    {
      title: "Teacher Classroom Reports",
      description: "Exportable PDF reports for teachers summarizing class participation and attendance records post-lecture.",
      icon: FileText,
      status: "Future",
      upcoming: false
    },
    {
      title: "AI-Powered Attendance Prediction",
      description: "Using historical attendance data and machine learning to predict class absenteeism and alert counselors proactively.",
      icon: Brain,
      status: "Future",
      upcoming: false
    }
  ];

  return (
    <div className="py-12 px-6 lg:px-12 max-w-6xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Future Development Roadmap
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          We're constantly working to push the boundaries of Smart Classrooms. Check out the upcoming features designed to make SmartAttendence the most powerful educational tool on the market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative">
        {roadmapItems.map((item, idx) => (
          <RoadmapCard 
            key={idx}
            title={item.title}
            description={item.description}
            icon={item.icon}
            status={item.status}
            upcoming={item.upcoming}
          />
        ))}
      </div>
    </div>
  );
}
