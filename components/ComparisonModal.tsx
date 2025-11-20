
import React, { useEffect } from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
import { getFeatureIcon } from '../utils/iconMapper';
import StarRating from './StarRating';

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
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-start p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-7xl my-8 flex flex-col animate-scale-in border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Tool Comparison</h2>
            <p className="text-slate-500 text-sm mt-1">Comparing {tools.length} selected tools side-by-side</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
            aria-label="Close comparison"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 bg-slate-50/30">
            <div className={`grid ${gridCols} gap-6`}>
            {tools.map((tool) => {
                const styles = getCategoryStyles(tool.category);
                const rating = ratings[tool.name] || 0;

                return (
                <div key={tool.name} className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    {/* Tool Header */}
                    <div className={`p-6 border-b-4 ${styles.border}`}>
                        <span className={`inline-block ${styles.bg} ${styles.text} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3`}>
                            {tool.category}
                        </span>
                        <h3 className="text-xl font-bold text-slate-800 h-14 flex items-center">{tool.name}</h3>
                        <div className="mt-2">
                             {/* Read-only star rating for comparison view */}
                             <div className="flex items-center space-x-1 pointer-events-none opacity-90">
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <svg
                                        key={starIndex}
                                        className={`w-5 h-5 ${rating >= starIndex ? 'text-amber-400' : 'text-slate-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-xs text-slate-400 ml-2">({rating}/5)</span>
                            </div>
                        </div>
                    </div>

