
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
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick, rating, onRate, isSelected, onToggleCompare }) => {
  const categoryStyles = getCategoryStyles(tool.category);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare(tool);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(tool);
  };

  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden border-2 cursor-pointer ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : `${categoryStyles.border} border-transparent border-t-4 hover:-translate-y-1.5`}`}
      onClick={() => onClick(tool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(tool)}
      aria-label={`View details for ${tool.name}`}
    >
      {/* Compare Checkbox */}
      <div className="absolute top-4 right-4 z-10">
        <div 
          className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-slate-200 hover:bg-indigo-50 transition-colors"
          onClick={handleCheckboxClick}
        >
            <label className="flex items-center cursor-pointer space-x-2">
                <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => {}} // Handled by parent div onClick
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <span className={`text-xs font-semibold ${isSelected ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {isSelected ? 'Selected' : 'Compare'}
                </span>
            </label>
        </div>
      </div>

      <div className="p-6 pt-10">
        <span className={`inline-block ${categoryStyles.bg} ${categoryStyles.text} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider`}>
          {tool.category}
        </span>
        <h3 className="mt-4 text-2xl font-bold text-slate-800">{tool.name}</h3>
        <p className="mt-2 text-slate-600 leading-relaxed h-20 overflow-hidden text-ellipsis">{tool.description}</p>
      </div>
      <div className="px-6 py-4 bg-slate-50/70 flex-grow">
        <h4 className="font-semibold text-slate-700">Key Features</h4>
        <ul className="mt-2 space-y-2">
          {tool.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start group/feature">
              <div className="mr-3 transition-transform duration-200 group-hover/feature:scale-110">
                {getFeatureIcon(feature)}
              </div>
              <span className="text-slate-600 text-sm leading-snug pt-0.5">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t border-slate-200">
        <h4 className="font-semibold text-slate-700">Why it's a Top Tool for 2026</h4>
        <p className="mt-2 text-sm text-slate-600 italic h-16 overflow-hidden text-ellipsis">"{tool.rationale}"</p>
      </div>
       <div className={`p-4 bg-slate-50/70 border-t border-slate-200 flex justify-between items-center gap-2`}>
          <StarRating rating={rating} onRate={onRate} />
          <div className="flex items-center gap-2">
             {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-500 hover:text-indigo-600 text-sm font-medium underline decoration-slate-300 hover:decoration-indigo-500 underline-offset-2 transition-colors"
              >
                Learn More
              </a>
             )}
            <button
              onClick={handleQuickView}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 ${categoryStyles.bg} ${categoryStyles.text} border ${categoryStyles.accent} hover:bg-opacity-80`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Quick View
            </button>
          </div>
       </div>
    </div>
  );
};

export default ToolCard;
