export const getCategoryStyles = (category: string): { border: string; bg: string; text: string; darkText: string; accent: string; ring: string; } => {
  switch (category.toLowerCase()) {
    case 'recruitment & onboarding':
      return { border: 'border-t-sky-500', bg: 'bg-sky-100', text: 'text-sky-800', darkText: 'text-sky-600', accent: 'border-sky-200', ring: 'focus:ring-sky-500' };
    case 'employee wellness':
      return { border: 'border-t-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-800', darkText: 'text-emerald-600', accent: 'border-emerald-200', ring: 'focus:ring-emerald-500' };
    case 'performance analytics':
      return { border: 'border-t-violet-500', bg: 'bg-violet-100', text: 'text-violet-800', darkText: 'text-violet-600', accent: 'border-violet-200', ring: 'focus:ring-violet-500' };
    case 'learning & development':
      return { border: 'border-t-amber-500', bg: 'bg-amber-100', text: 'text-amber-800', darkText: 'text-amber-600', accent: 'border-amber-200', ring: 'focus:ring-amber-500' };
    case 'compensation & benefits':
        return { border: 'border-t-rose-500', bg: 'bg-rose-100', text: 'text-rose-800', darkText: 'text-rose-600', accent: 'border-rose-200', ring: 'focus:ring-rose-500' };
    case 'hr operations':
        return { border: 'border-t-cyan-500', bg: 'bg-cyan-100', text: 'text-cyan-800', darkText: 'text-cyan-600', accent: 'border-cyan-200', ring: 'focus:ring-cyan-500' };
    case 'diversity, equity & inclusion':
        return { border: 'border-t-teal-500', bg: 'bg-teal-100', text: 'text-teal-800', darkText: 'text-teal-600', accent: 'border-teal-200', ring: 'focus:ring-teal-500' };
    default:
      return { border: 'border-t-slate-500', bg: 'bg-slate-100', text: 'text-slate-800', darkText: 'text-slate-600', accent: 'border-slate-200', ring: 'focus:ring-slate-500' };
  }
};