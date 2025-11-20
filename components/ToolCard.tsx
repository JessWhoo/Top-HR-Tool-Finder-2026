
import React from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
import { getFeatureIcon } from '../utils/iconMapper';
import StarRating from './StarRating';

interface ToolCardProps {
  tool: HRTool;
  onClick: (tool: HRTool) => void;
  rating: number;
  onRate: (rating: number) => void;
  isSelected: boolean;
  onToggleCompare: (tool: HRTool) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
    tool, 
    onClick, 
    rating, 
    onRate, 
    isSelected, 
    onToggleCompare,
    isFavorite,
    onToggleFavorite
}) => {
  const categoryStyles = getCategoryStyles(tool.category);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare(tool);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(tool);
  };

  // Ensure URL has protocol
  const websiteUrl = tool.website?.startsWith('http') ? tool.website : `https://${tool.website}`;

  return (
    <div 
      className={`group relative bg-white rounded-2xl transition-all duration-300 ease-out flex flex-col border overflow-hidden
        ${isSelected 
          ? 'border-indigo-500 shadow-[0_0_0_2px_rgba(99,102,241,1)] shadow-indigo-100 scale-[1.02] z-10' 
          : 'border-slate-200/60 hover:border-indigo-300/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1'
        }`}
      onClick={() => onClick(tool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(tool)}
    >
      {/* Top Action Bar (Floating) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-1 group-hover:translate-y-0">
         {/* Favorite Button */}
         <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full border shadow-sm backdrop-blur-sm transition-colors duration-200 ${
                isFavorite 
                ? 'bg-red-50 border-red-200 text-red-500' 
                : 'bg-white/90 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-white'
            }`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
         >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isFavorite ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
         </button>

        {/* Compare Toggle */}
        <div 
          className={`flex items-center backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border cursor-pointer transition-colors ${
              isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white/90 border-slate-200 hover:bg-white'
          }`}
          onClick={handleCheckboxClick}
        >
            <label className="flex items-center cursor-pointer gap-2">
                <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => {}} // Handled by parent div onClick
                    className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <span className={`text-xs font-semibold ${isSelected ? 'text-indigo-700' : 'text-slate-500'}`}>
                    Compare
                </span>
            </label>
        </div>
      </div>

      {/* Always visible favorite indicator if favored (when not hovering) */}
      {isFavorite && (
          <div className="absolute top-4 right-4 z-10 group-hover:opacity-0 transition-opacity duration-200">
             <div className="p-2 rounded-full bg-red-50 border border-red-100 text-red-500 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
             </div>
          </div>
      )}

      <div className="p-6 pb-4">
        <div className="flex justify-between items-start">
             <span className={`inline-block ${categoryStyles.bg} ${categoryStyles.text} border ${categoryStyles.badgeBorder} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-4`}>
              {tool.category}
            </span>
        </div>
       
        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {tool.name}
        </h3>
        <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3 h-[4.5em]">
            {tool.description}
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="px-6 pb-6 flex-grow">
        <div className="space-y-2.5 mt-2">
          {tool.keyFeatures.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <div className="mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                {getFeatureIcon(feature)}
              </div>
              <span className="text-slate-600 text-sm font-medium leading-tight truncate">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center gap-2 mt-auto">
          <StarRating rating={rating} onRate={onRate} />
          
          <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
             {tool.website && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors"
              >
                Website
              </a>
             )}
             <div className="h-4 w-px bg-slate-300/50"></div>
            <button
              onClick={handleQuickView}
              className={`text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-1`}
            >
              Quick View
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
       </div>
    </div>
  );
};

export default ToolCard;
