import React from 'react';

const RoadmapCard = ({ title, description, icon: Icon, status, upcoming }) => {
  return (
    <div className={`
      relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
      ${upcoming 
        ? 'bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-blue-100 hover:border-blue-200' 
        : 'bg-white border-gray-100 hover:border-gray-200'}
    `}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${upcoming ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
              status === 'Planning' ? 'bg-gray-100 text-gray-600' : 
              status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
