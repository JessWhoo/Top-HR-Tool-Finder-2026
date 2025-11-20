import React, { useEffect, useState } from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
import { getFeatureIcon } from '../utils/iconMapper';
import StarRating from './StarRating';


interface ToolDetailModalProps {
  tool: HRTool;
  onClose: () => void;
  rating: number;
  onRate: (rating: number) => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose, rating, onRate }) => {
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleShare = () => {
    try {
      const json = JSON.stringify(tool);
      // Use encodeURIComponent to handle UTF-8 characters correctly before encoding to base64
      const encoded = btoa(encodeURIComponent(json));
      const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    } catch (error) {
      console.error('Failed to share tool:', error);
    }
  };

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
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 border ${copySuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              title="Share unique link to this tool"
            >
               {copySuccess ? (
                 <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   <span className="text-sm font-medium">Copied!</span>
                 </>
               ) : (
                 <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                   </svg>
                   <span className="text-sm font-medium">Share</span>
                 </>
               )}
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>
        
        <div className="p-6 flex-grow">
          <p className="text-slate-600 leading-relaxed mb-6">{tool.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold text-slate-700 mb-3 text-lg">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tool.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start p-2 bg-slate-50 rounded-lg">
                   <div className="mr-3 mt-0.5">
                     {getFeatureIcon(feature)}
                   </div>
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