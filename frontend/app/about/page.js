import React from 'react';
import { Database, MonitorSmartphone, BrainCircuit, Server, Zap, ShieldCheck } from 'lucide-react';

export default function About() {
  const cards = [
    {
      title: "AI Detection Engine",
      description: "Powered by TensorFlow.js and an optimized SSD Mobilenet v1 model, our platform detects faces natively in the browser at high frame rates, without sending video frames over the network to external servers. This inherently guarantees student privacy.",
      icon: BrainCircuit,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      title: "Cloud Storage",
      description: "Secure, reliable, and instantaneous image cloud hosting with Cloudinary. Every successful capture that runs through our AI detector is immediately backed up and securely mapped to its relevant metadata.",
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: "Real-time Captures",
      description: "Integrated React webcam hooks ensure 1080p, high-fidelity capture straight from the educator's browser, eliminating bulky hardware dependencies.",
      icon: MonitorSmartphone,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      title: "Data Persistence",
      description: "Scalable MongoDB unstructured database hosting for immediate read/write access. Storing deep JSON schemas related to classroom analytics naturally.",
      icon: Server,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100"
    }
  ];

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Redefining the <span className="text-blue-600">Smart Classroom</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
          SmartAttendence bridges the gap between manual labor and intelligent automation. Built around privacy-first Edge AI and scalable cloud architecture, we've designed an accessible system for modern educators.
        </p>
      </div>

      <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white ${card.border}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-3xl p-10 lg:p-16 text-center shadow-2xl overflow-hidden relative border border-gray-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Why is this useful?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-10">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-100">Reclaims Teaching Time</h4>
                <p className="text-gray-400 text-sm mt-2">No more spending 10 minutes at the start of every lecture verifying headcount.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-100">Proxy Prevention</h4>
                <p className="text-gray-400 text-sm mt-2">Visually confirm and store cryptographic attendance state to completely avoid manual signature forgery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
