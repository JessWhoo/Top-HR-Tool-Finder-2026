
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
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ 
    tool, 
    onClose, 
    rating, 
    onRate,
    isFavorite,
    onToggleFavorite
}) => {
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
  const websiteUrl = tool.website?.startsWith('http') ? tool.website : `https://${tool.website}`;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
             <span className={`inline-block ${categoryStyles.bg} ${categoryStyles.text} border ${categoryStyles.badgeBorder} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-3`}>
              {tool.category}
            </span>
            <h2 id="tool-modal-title" className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{tool.name}</h2>
            <div className="mt-4 flex items-center gap-2">
               <StarRating rating={rating} onRate={onRate} />
               <span className="text-sm text-slate-400 font-medium ml-2">Rate this tool</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-start">
             <button
                onClick={onToggleFavorite}
                className={`p-2.5 rounded-full border transition-all duration-200 ${
                    isFavorite 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:bg-slate-50'
                }`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
             >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isFavorite ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
             </button>

            <button 
              onClick={handleShare}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all duration-200 border font-medium text-sm ${copySuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            >
               {copySuccess ? (
                 <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   <span>Copied</span>
                 </>
               ) : (
                 <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                   </svg>
                   <span>Share</span>
                 </>
               )}
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors ml-2" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        
        <div className="p-8 md:p-10 flex-grow">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Description</h3>
          <p className="text-slate-700 leading-relaxed text-lg mb-10">{tool.description}</p>
          
          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="mr-3.5 mt-0.5 p-1.5 bg-white rounded-lg shadow-sm text-slate-600">
                     {getFeatureIcon(feature)}
                   </div>
                  <span className="text-slate-700 font-medium leading-snug py-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100/50">
            <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3">Future Outlook</h3>
            <p className="text-indigo-900/80 italic text-lg font-serif">"{tool.rationale}"</p>
          </div>

          {tool.website && (
              <div className="flex justify-center md:justify-start pt-4">
                  <a 
                    href={websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transition-all duration-200"
                  >
                      <span>Visit Official Website</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                  </a>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetailModal;
