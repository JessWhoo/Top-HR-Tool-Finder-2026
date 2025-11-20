
export const getCategoryStyles = (category: string): { border: string; bg: string; text: string; darkText: string; accent: string; ring: string; badgeBorder: string } => {
  switch (category.toLowerCase()) {
    case 'recruitment & onboarding':
      return { 
        border: 'border-sky-500', 
        bg: 'bg-sky-50', 
        text: 'text-sky-700', 
        darkText: 'text-sky-900', 
        accent: 'border-sky-200', 
        ring: 'focus:ring-sky-500',
        badgeBorder: 'border-sky-200'
      };
    case 'employee wellness':
      return { 
        border: 'border-emerald-500', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700', 
        darkText: 'text-emerald-900', 
        accent: 'border-emerald-200', 
        ring: 'focus:ring-emerald-500',
        badgeBorder: 'border-emerald-200'
      };
    case 'performance analytics':
      return { 
        border: 'border-violet-500', 
        bg: 'bg-violet-50', 
        text: 'text-violet-700', 
        darkText: 'text-violet-900', 
        accent: 'border-violet-200', 
        ring: 'focus:ring-violet-500',
        badgeBorder: 'border-violet-200'
      };
    case 'learning & development':
      return { 
        border: 'border-amber-500', 
        bg: 'bg-amber-50', 
        text: 'text-amber-700', 
        darkText: 'text-amber-900', 
        accent: 'border-amber-200', 
        ring: 'focus:ring-amber-500',
        badgeBorder: 'border-amber-200'
      };
    case 'compensation & benefits':
        return { 
          border: 'border-rose-500', 
          bg: 'bg-rose-50', 
          text: 'text-rose-700', 
          darkText: 'text-rose-900', 
          accent: 'border-rose-200', 
          ring: 'focus:ring-rose-500',
          badgeBorder: 'border-rose-200'
        };
    case 'hr operations':
        return { 
          border: 'border-cyan-500', 
          bg: 'bg-cyan-50', 
          text: 'text-cyan-700', 
          darkText: 'text-cyan-900', 
          accent: 'border-cyan-200', 
          ring: 'focus:ring-cyan-500',
          badgeBorder: 'border-cyan-200'
        };
    case 'diversity, equity & inclusion':
        return { 
          border: 'border-fuchsia-500', 
          bg: 'bg-fuchsia-50', 
          text: 'text-fuchsia-700', 
          darkText: 'text-fuchsia-900', 
          accent: 'border-fuchsia-200', 
          ring: 'focus:ring-fuchsia-500',
          badgeBorder: 'border-fuchsia-200'
        };
    default:
      return { 
        border: 'border-slate-500', 
        bg: 'bg-slate-50', 
        text: 'text-slate-700', 
        darkText: 'text-slate-900', 
        accent: 'border-slate-200', 
        ring: 'focus:ring-slate-500',
        badgeBorder: 'border-slate-200'
      };
  }
};
