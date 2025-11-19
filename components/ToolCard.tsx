import React from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';
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
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t border-slate-200">
        <h4 className="font-semibold text-slate-700">Why it's a Top Tool for 2026</h4>
        <p className="mt-2 text-sm text-slate-600 italic h-16 overflow-hidden text-ellipsis">"{tool.rationale}"</p>
      </div>
       <div className={`p-4 bg-slate-50/70 border-t border-slate-200 flex justify-between items-center`}>
          <StarRating rating={rating} onRate={onRate} />
          <div className={`${categoryStyles.darkText} font-semibold flex items-center gap-1.5`}>
            <span>View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
       </div>
    </div>
  );
};

export default ToolCard;