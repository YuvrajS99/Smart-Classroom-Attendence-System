"use client";
import React from 'react';
import { Calendar } from 'lucide-react';

const HistoryCards = ({ captures }) => {
  const formatDate = (dateString, full = false) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const options = full 
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      : { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden grid grid-cols-1 gap-4 p-4 w-full bg-gray-50/30">
        {captures?.map((capture) => (
          <div key={capture._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4 transition-transform hover:scale-[1.01]">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {capture.studentCount} Students
                </span>
                <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                  {formatDate(capture.createdAt)}
                </div>
              </div>
            </div>
            <div>
              <a href={capture.imageURL || capture.imageUrl} target="_blank" rel="noreferrer" className="block w-full">
                <img 
                  src={capture.imageURL || capture.imageUrl} 
                  alt="Capture Preview" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto flex-1 w-full relative">
        <table className="min-w-full divide-y divide-gray-200 block md:table">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">Date & Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">Detected Students</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">Cloudinary Asset</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {captures?.map((capture) => (
              <tr key={capture._id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center font-medium">
                    <Calendar className="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    {formatDate(capture.createdAt, true)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-4 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    {capture.studentCount} Students
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={capture.imageURL || capture.imageUrl} target="_blank" rel="noreferrer" className="block relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-fit">
                    <img 
                      src={capture.imageUrl || capture.imageURL} 
                      alt="Capture Preview" 
                      className="h-20 w-32 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-blue-300"
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryCards;
