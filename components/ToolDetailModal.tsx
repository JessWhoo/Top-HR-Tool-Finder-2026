import React, { useEffect } from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
import StarRating from './StarRating';


interface ToolDetailModalProps {
  tool: HRTool;
  onClose: () => void;
  rating: number;
  onRate: (rating: number) => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose, rating, onRate }) => {
  
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

  if (!tool) return null;
  
  const categoryStyles = getCategoryStyles(tool.category);
  // Dynamically create class names for button colors
  const buttonBgClass = categoryStyles.bg.replace('bg-', 'bg-').replace('100', '600');
  const buttonHoverBgClass = categoryStyles.bg.replace('bg-', 'hover:bg-').replace('100', '700');


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-200 flex justify-between items-start">
          <div>
            <span className={`inline-block ${categoryStyles.bg} ${categoryStyles.text} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider`}>
              {tool.category}
            </span>
            <h2 id="tool-modal-title" className="mt-2 text-3xl font-bold text-slate-800">{tool.name}</h2>
            <div className="mt-3">
              <StarRating rating={rating} onRate={onRate} />
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        
        <div className="p-6 flex-grow">
          <p className="text-slate-600 leading-relaxed mb-6">{tool.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold text-slate-700 mb-3 text-lg">Key Features</h3>
            <ul className="space-y-2">
              {tool.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3 text-lg">Why it's a Top Tool for 2026</h3>
            <blockquote className={`border-l-4 ${categoryStyles.accent} pl-4 py-2 bg-slate-50/70 rounded-r-md`}>
              <p className="text-slate-700 italic">"{tool.rationale}"</p>
            </blockquote>
          </div>
        </div>
        
        <footer className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button 
            onClick={onClose}
            className={`px-6 py-2 ${buttonBgClass} text-white font-semibold rounded-lg shadow-md ${buttonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-opacity-75 ${categoryStyles.ring} transition-colors`}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ToolDetailModal;