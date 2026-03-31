import React from 'react';
import { Layers, ListChecks, Info } from 'lucide-react';

export default function About() {
  const steps = [
    "User logs into the system",
    "Opens Capture Classroom page",
    "Webcam captures classroom image",
    "TensorFlow AI detects faces",
    "System counts students",
    "Image uploaded to Cloudinary",
    "Data saved to MongoDB",
    "Dashboard shows attendance analytics"
  ];

  const technologies = [
    { category: "Frontend", items: ["Next.js", "Tailwind CSS", "Recharts"] },
    { category: "AI", items: ["TensorFlow.js", "Face API"] },
    { category: "Backend", items: ["Node.js", "Express.js"] },
    { category: "Database", items: ["MongoDB"] },
    { category: "Cloud Storage", items: ["Cloudinary"] },
    { category: "Deployment", items: ["Vercel (Frontend)", "Render (Backend)"] }
  ];

  return (
    <div className="py-12 px-6 lg:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
          <Info size={32} />
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          About SmartAttendence
        </h1>
      </div>

      <div className="space-y-16">
        {/* Project Overview */}
        <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Layers className="text-blue-500" />
            Project Overview
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            SmartAttendence is an intelligent platform that utilizes advanced AI face detection to automatically count students in a classroom and securely maintain attendance records. It bridges the gap between manual labor and intelligent automation by tracking classroom participation precisely without sending sensitive real-time video feeds over external networks.
          </p>
        </section>

        {/* How the System Works */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-indigo-900 mb-8 flex items-center gap-3">
            <ListChecks className="text-indigo-600" />
            How the System Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-50 relative group hover:-translate-y-1 transition-transform">
                <span className="absolute -top-4 -left-3 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </span>
                <p className="text-gray-800 font-medium mt-2">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  {tech.category}
                </h3>
                <ul className="space-y-2">
                  {tech.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
