
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-slate-700">Analyzing Future HR Trends...</p>
        <p className="text-slate-500">Generating insights with Gemini.</p>
    </div>
  );
};

export default LoadingSpinner;
