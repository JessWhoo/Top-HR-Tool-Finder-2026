
import React, { useState, useEffect } from 'react';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const Star: React.FC<{ 
  filled: boolean; 
  onClick: () => void; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void; 
  isAnimating: boolean;
  index: number;
}> = ({ filled, onClick, onMouseEnter, onMouseLeave, isAnimating, index }) => {
  return (
    <svg
      className={`w-6 h-6 cursor-pointer transition-all duration-300 transform ${
        filled ? 'text-amber-400' : 'text-slate-300 hover:text-amber-300'
      } ${isAnimating && filled ? 'scale-125' : 'hover:scale-110'}`}
      style={{ 
        transitionDelay: isAnimating ? `${index * 50}ms` : '0ms' 
      }}
      fill="currentColor"
      viewBox="0 0 20 20"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showFeedback) {
      timer = setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showFeedback]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Duration of the pop animation sequence
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const handleClick = (e: React.MouseEvent, ratingValue: number) => {
    e.stopPropagation(); // Prevent card/modal click events
    onRate(ratingValue);
    setShowFeedback(true);
    setIsAnimating(true);
  };
  
  const handleMouseEnter = (e: React.MouseEvent, ratingValue: number) => {
    e.stopPropagation();
    if (!isAnimating) {
        setHoverRating(ratingValue);
    }
  };
  
  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimating) {
        setHoverRating(0);
    }
  };

  return (
    <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
      {/* Feedback Tooltip */}
      <div className={`absolute bottom-full left-0 mb-2 z-10 transition-all duration-300 ease-out transform origin-bottom-left ${showFeedback ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}`}>
        <div className="bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl flex items-center whitespace-nowrap">
          <svg className="w-3.5 h-3.5 mr-1.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Thanks for rating!
          <div className="absolute -bottom-1 left-3 w-2 h-2 bg-slate-800 transform rotate-45"></div>
        </div>
      </div>

      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Star
            key={starIndex}
            index={starIndex}
            filled={(hoverRating || rating) >= starIndex}
            isAnimating={isAnimating}
            onClick={(e) => handleClick(e, starIndex)}
            onMouseEnter={(e) => handleMouseEnter(e, starIndex)}
            onMouseLeave={(e) => handleMouseLeave(e)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
