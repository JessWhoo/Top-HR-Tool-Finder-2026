import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center py-12 md:py-16 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200/80">
      <div className="animate-fade-in-down">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
          Top HR Tools for 2026
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
          AI-Powered Insights into the Future of Human Resources Technology
        </p>
      </div>
    </header>
  );
};

export default Header;
