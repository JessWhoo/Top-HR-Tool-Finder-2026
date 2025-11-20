import React from 'react';

// Helper component for consistent icon sizing and styling
const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "w-5 h-5 text-indigo-500" 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`flex-shrink-0 mt-0.5 ${className}`}
  >
    {children}
  </svg>
);

export const getFeatureIcon = (featureText: string): React.ReactNode => {
  const text = featureText.toLowerCase();

  // AI / Automation / Smart
  if (text.match(/(ai|artificial intelligence|auto|smart|bot|predict|machine learning|genai|gpt)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-violet-500">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6.97 11.03a5.25 5.25 0 00-3.43-3.43l-1.168-.334a.75.75 0 000 1.442l1.168.334a5.25 5.25 0 003.43 3.43l1.168.334a.75.75 0 000-1.442l-1.168-.334z" clipRule="evenodd" />
      </IconWrapper>
    );
  }

  // Data / Analytics / Dashboard
  if (text.match(/(data|analytics|insight|metric|kpi|dashboard|report|measure|track)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-blue-500">
        <path fillRule="evenodd" d="M3 13.75C3 12.784 3.784 12 4.75 12h1.5c.966 0 1.75.784 1.75 1.75v6.75A1.75 1.75 0 016.25 22.25h-1.5A1.75 1.75 0 013 20.5v-6.75zm6-6c0-.966.784-1.75 1.75-1.75h1.5c.966 0 1.75.784 1.75 1.75v12.75a1.75 1.75 0 01-1.75 1.75h-1.5A1.75 1.75 0 019 20.5V7.75zm6-4c0-.966.784-1.75 1.75-1.75h1.5c.966 0 1.75.784 1.75 1.75v16.75a1.75 1.75 0 01-1.75 1.75h-1.5A1.75 1.75 0 0115 20.5V3.75z" clipRule="evenodd" />
      </IconWrapper>
    );
  }

  // People / Social / Talent
  if (text.match(/(employee|candidate|user|talent|people|staff|human|social|culture|engage)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-pink-500">
        <path d="M15.75 2.25a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0zM2.625 15.75a9.768 9.768 0 019.375-7.5 9.768 9.768 0 019.375 7.5.375.375 0 01-.375.375H3a.375.375 0 01-.375-.375z" />
      </IconWrapper>
    );
  }

  // Money / Comp / Benefits
  if (text.match(/(pay|salary|comp|money|benefit|financial|wallet|cost|budget|payroll)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-emerald-600">
        <path d="M10.464 2.314a.5.5 0 00-.928 0l-1.436 4.42h-4.65c-.47 0-.665.584-.285.86l3.762 2.734-1.437 4.421a.5.5 0 00.785.57L10 12.457l3.727 2.862a.5.5 0 00.785-.57l-1.437-4.42 3.762-2.735c.38-.276.185-.86-.285-.86h-4.65l-1.436-4.42zM5.25 18a.75.75 0 000 1.5h13.5a.75.75 0 000-1.5H5.25z" />
      </IconWrapper>
    );
  }

  // Time / Schedule
  if (text.match(/(time|schedule|calendar|shift|attendance|flex|clock)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-orange-500">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
      </IconWrapper>
    );
  }

  // Security / Compliance / Privacy
  if (text.match(/(secure|privacy|compliant|gdpr|protect|safety|risk|verify)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-slate-600">
        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.114-2.634-.335-3.89a.75.75 0 00-.722-.515 11.208 11.208 0 01-7.877-3.08zM12 13.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" />
      </IconWrapper>
    );
  }

  // Global / Remote / Cloud
  if (text.match(/(global|remote|cloud|web|world|distributed|anywhere|virtual)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-sky-500">
        <path fillRule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clipRule="evenodd" />
      </IconWrapper>
    );
  }

  // Learning / Education / Skills
  if (text.match(/(learn|train|skill|course|educate|develop|growth|knowledge)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-amber-500">
        <path d="M11.25 4.53l-9.298 3.664a.636.636 0 000 1.175l9.298 3.664a1.536 1.536 0 001.104 0l9.298-3.664a.636.636 0 000-1.175L12.354 4.53a1.535 1.535 0 00-1.104 0zM3.75 11.25a.75.75 0 00-1.5 0v5.25c0 .414.336.75.75.75h18a.75.75 0 00.75-.75V11.25a.75.75 0 00-1.5 0v4.5H3.75v-4.5z" />
      </IconWrapper>
    );
  }

  // Health / Wellness
  if (text.match(/(health|well|mental|fitness|care|stress|burnout)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-red-500">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </IconWrapper>
    );
  }
  
   // Integration / Connect
  if (text.match(/(integrate|api|connect|link|sync|platform|unified)/)) {
    return (
       <IconWrapper className="w-5 h-5 text-teal-500">
        <path fillRule="evenodd" d="M12.5 6.75a.75.75 0 00-1.5 0v2.25H8.75a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5h-2.25V6.75z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
      </IconWrapper>
    );
  }

  // Communication / Chat
  if (text.match(/(chat|message|communicate|video|voice|feedback|survey)/)) {
    return (
      <IconWrapper className="w-5 h-5 text-indigo-500">
        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
      </IconWrapper>
    );
  }
  
  // Mobile / App
  if (text.match(/(mobile|app|phone|ios|android)/)) {
     return (
      <IconWrapper className="w-5 h-5 text-purple-500">
        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3h6.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
      </IconWrapper>
     )
  }

  // Default: Checkmark
  return (
    <IconWrapper className="w-5 h-5 text-green-500">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </IconWrapper>
  );
};
