
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center pt-20 pb-12 relative overflow-hidden">
      {/* Abstract decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-100/50 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <div className="animate-fade-in-down relative z-10 px-4">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold tracking-wide mb-4 shadow-sm">
          Future of Work Report
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-4">
          Top HR Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">2026</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed" style={{ animationDelay: '0.1s' }}>
          Discover the AI-powered solutions redefining recruitment, engagement, and analytics for the next generation of workforce management.
        </p>
      </div>
    </header>
  );
};

export default Header;
