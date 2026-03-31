import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">S</span>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-wide">
              SmartAttendence
            </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500">
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/future" className="hover:text-blue-600 transition-colors">
            Future Development
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
        
        <div className="text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} SmartAttendence. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
