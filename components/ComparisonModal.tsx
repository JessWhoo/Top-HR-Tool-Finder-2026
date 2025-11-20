
import React, { useEffect } from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
import { getFeatureIcon } from '../utils/iconMapper';

interface ComparisonModalProps {
  tools: HRTool[];
  onClose: () => void;
  ratings: { [key: string]: number };
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ tools, onClose, ratings }) => {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Determine grid columns based on number of tools (max 3 usually)
  const gridCols = tools.length === 1 ? 'grid-cols-1' : tools.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

  return (
    <div 
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex justify-center items-start p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-7xl my-8 flex flex-col animate-scale-in border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Global Modal Header - Sticky to the top of the modal viewport */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-t-xl sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Tool Comparison
            </h2>
            <p className="text-slate-500 text-sm mt-1 ml-9">Comparing {tools.length} selected tools side-by-side</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            aria-label="Close comparison"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comparison Content */}
        <div className="flex-grow bg-slate-100/50 p-6">
            <div className={`grid ${gridCols} gap-6`}>
            {tools.map((tool, index) => {
                const styles = getCategoryStyles(tool.category);
                const rating = ratings[tool.name] || 0;
                const animationDelay = `${index * 100}ms`;

                return (
                <div 
                    key={tool.name} 
                    className="bg-white rounded-xl shadow-md hover:shadow-lg border border-slate-200/80 flex flex-col overflow-hidden transition-all duration-300 animate-fade-in-down"
                    style={{ animationDelay }}
                >
                    {/* Tool Header - Sticky below the main modal header */}
                    {/* Top is approx 85px to account for the modal header */}
                    <div className={`p-6 border-b-4 ${styles.border} bg-white sticky top-[81px] z-20 shadow-sm`}>
                        <div className="flex justify-between items-start mb-3">
                            <span className={`inline-block ${styles.bg} ${styles.text} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                                {tool.category}
                            </span>
                            <div className="flex items-center space-x-0.5">
                                <svg className={`w-4 h-4 ${rating >= 1 ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span className="text-xs font-bold text-slate-700 ml-1">{rating > 0 ? rating.toFixed(1) : '-'}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 leading-tight min-h-[3.5rem] flex items-center">{tool.name}</h3>
                    </div>

                    {/* Description */}
                    <div className="p-6 border-b border-slate-100 flex-grow bg-white">
                        <h4 className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Description
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>
                    </div>

                    {/* Features */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50">
                        <h4 className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Key Features
                        </h4>
                        <ul className="space-y-3">
                            {tool.keyFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm text-slate-700 bg-white p-2 rounded border border-slate-200/60 shadow-sm">
                                    <div className="mr-2 mt-0.5 flex-shrink-0">
                                        {getFeatureIcon(feature)}
                                    </div>
                                    <span className="leading-snug">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Rationale */}
                    <div className="p-6 bg-indigo-50/40 flex-grow">
                         <h4 className="flex items-center text-xs font-bold text-indigo-400 uppercase tracking-wide mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Why it's a winner
                        </h4>
                        <div className="relative">
                            <span className="absolute top-0 left-0 text-4xl text-indigo-200 -mt-2 -ml-2">"</span>
                            <p className="text-slate-700 text-sm italic relative z-10 indent-2">{tool.rationale}</p>
                        </div>
                    </div>
                    
                     {/* Website Link */}
                    {tool.website && (
                        <div className="p-4 bg-white text-center border-t border-slate-200">
                            <a 
                                href={tool.website} 
                                target="_blank" 
                                rel="