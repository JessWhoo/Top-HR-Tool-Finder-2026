import React, { useEffect } from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
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

  const gridCols = tools.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

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

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
            <div className="min-w-[800px] p-6">
                <div className={`grid ${gridCols} gap-8`}>
                {tools.map((tool) => {
                    const styles = getCategoryStyles(tool.category);
                    return (
                    <div key={tool.name} className="flex flex-col space-y-6">
                        {/* Tool Header Info */}
                        <div className={`pb-4 border-b-4 ${styles.border}`}>
                            <span className={`inline-block ${styles.bg} ${styles.text} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3`}>
                                {tool.category}
                            </span>
                            <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
                            <div className="mt-2">
                                <StarRating rating={ratings[tool.name] || 0} onRate={() => {}} />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-slate-600 text-sm leading-relaxed min-h-[80px]">
                                {tool.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        <div className="flex-grow bg-slate-50 rounded-lg p-4">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features</h4>
                            <ul className="space-y-3">
                                {tool.keyFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-slate-700">{feature}</span>
                                </li>
                                ))}
                            </ul>
                        </div>

                         {/* Rationale */}
                         <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">2026 Prediction</h4>
                            <p className="text-slate-600 text-sm italic border-l-2 border-slate-300 pl-3">
                                "{tool.rationale}"
                            </p>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;