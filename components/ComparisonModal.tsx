
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
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex justify-center items-start p-4 md:p-8 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#f8fafc] rounded-2xl shadow-2xl w-full max-w-7xl my-auto flex flex-col animate-scale-in border border-white/20 overflow-hidden ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Compare Tools</h2>
            <p className="text-slate-500 text-sm mt-1">Analyzing {tools.length} selected solutions</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
            aria-label="Close comparison"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comparison Content */}
        <div className="flex-grow p-8 bg-slate-50/50">
            <div className={`grid ${gridCols} gap-8`}>
            {tools.map((tool, index) => {
                const styles = getCategoryStyles(tool.category);
                const rating = ratings[tool.name] || 0;
                const animationDelay = `${index * 100}ms`;
                const websiteUrl = tool.website?.startsWith('http') ? tool.website : `https://${tool.website}`;

                return (
                <div 
                    key={tool.name} 
                    className="bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] ring-1 ring-slate-200/60 flex flex-col overflow-hidden transition-all duration-300 animate-fade-in-down hover:shadow-xl"
                    style={{ animationDelay }}
                >
                    {/* Tool Header */}
                    <div className={`p-8 pb-6 border-b border-slate-100`}>
                         <span className={`inline-block ${styles.bg} ${styles.text} border ${styles.badgeBorder} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-4`}>
                            {tool.category}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2 min-h-[4rem] flex items-center">{tool.name}</h3>
                        
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} className={`w-4 h-4 ${rating >= star ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <span className="text-xs font-medium text-slate-400 ml-1">
                                {rating > 0 ? `${rating}/5` : 'Not rated'}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-8 py-6 border-b border-slate-50 flex-grow">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Overview</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>
                    </div>

                    {/* Features */}
                    <div className="p-8 py-6 bg-slate-50/30 border-b border-slate-50">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Features</h4>
                        <ul className="space-y-3">
                            {tool.keyFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm text-slate-700">
                                    <div className="mr-3 mt-0.5 flex-shrink-0 p-1 bg-white rounded-md shadow-sm border border-slate-100 text-slate-500">
                                        {getFeatureIcon(feature)}
                                    </div>
                                    <span className="leading-snug py-1">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Rationale */}
                    <div className="p-8 py-6 bg-gradient-to-b from-white to-slate-50">
                         <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-4">Why it wins</h4>
                        <div className="relative pl-4 border-l-2 border-indigo-100">
                            <p className="text-slate-700 text-sm italic leading-relaxed">"{tool.rationale}"</p>
                        </div>
                    </div>
                    
                    {/* Action */}
                    {tool.website && (
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <a 
                                href={websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full py-3 text-sm font-bold text-indigo-600 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                Visit Website
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
                );
            })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
