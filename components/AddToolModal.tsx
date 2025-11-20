
import React, { useState, useEffect } from 'react';
import { HRTool } from '../types';
import { getCategoryStyles } from '../utils/styleUtils';

interface AddToolModalProps {
  onClose: () => void;
  onAdd: (tool: HRTool) => void;
  existingCategories: string[];
}

const AddToolModal: React.FC<AddToolModalProps> = ({ onClose, onAdd, existingCategories }) => {
  const [formData, setFormData] = useState<Partial<HRTool>>({
    name: '',
    category: existingCategories[0] || 'HR Operations',
    description: '',
    rationale: '',
    website: '',
  });
  
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Filter out 'all' from categories for the dropdown
  const categories = existingCategories.filter(c => c !== 'all');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddFeature = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (currentFeature.trim()) {
      if (features.length >= 5) {
        setErrors(prev => ({ ...prev, features: 'Maximum 5 features allowed' }));
        return;
      }
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature('');
      setErrors(prev => ({ ...prev, features: '' }));
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: {[key: string]: string} = {};
    if (!formData.name?.trim()) newErrors.name = 'Tool name is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.rationale?.trim()) newErrors.rationale = 'Rationale is required';
    if (features.length === 0) newErrors.features = 'At least one key feature is required';
    if (!formData.category) newErrors.category = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTool: HRTool = {
      name: formData.name!,
      category: formData.category!,
      description: formData.description!,
      keyFeatures: features,
      rationale: formData.rationale!,
      website: formData.website || undefined
    };

    onAdd(newTool);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in ring-1 ring-black/5 flex flex-col">
        
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl sticky top-0 z-10 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-slate-900">Add New Tool</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tool Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-xl border ${errors.name ? 'border-red-300 ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} focus:ring-4 outline-none transition-all`}
                placeholder="e.g. WorkDay 2.0"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-2 rounded-xl border ${errors.description ? 'border-red-300 ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} focus:ring-4 outline-none transition-all resize-none`}
              placeholder="Briefly describe what the tool does..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Key Features (Min 1) *</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFeature(e)}
                className="flex-grow px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                placeholder="Type a feature and press Add"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Add
              </button>
            </div>
            
            {features.length > 0 ? (
               <div className="flex flex-wrap gap-2">
                {features.map((feature, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm border border-indigo-100">
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="ml-2 text-indigo-400 hover:text-indigo-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No features added yet.</p>
            )}
             {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
          </div>

          {/* Rationale */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Rationale for 2026 *</label>
            <textarea
              name="rationale"
              value={formData.rationale}
              onChange={handleInputChange}
              rows={2}
              className={`w-full px-4 py-2 rounded-xl border ${errors.rationale ? 'border-red-300 ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} focus:ring-4 outline-none transition-all resize-none`}
              placeholder="Why will this be a top tool in 2026?"
            />
            {errors.rationale && <p className="text-red-500 text-xs mt-1">{errors.rationale}</p>}
          </div>

          {/* Website */}
          <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">Website (Optional)</label>
             <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                placeholder="https://example.com"
              />
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:translate-y-[-1px] transition-all"
            >
              Save Tool
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddToolModal;
