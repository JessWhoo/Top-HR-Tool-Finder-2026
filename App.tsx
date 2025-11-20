
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HRTool, HRAnalysis, EmergingTechnology } from './types';
import { fetchHRTools, fetchHRAnalysis, fetchDEITools } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ToolCard from './components/ToolCard';
import ToolDetailModal from './components/ToolDetailModal';
import ComparisonModal from './components/ComparisonModal';

const RATINGS_STORAGE_KEY = 'hrToolRatings';
const FAVORITES_STORAGE_KEY = 'hrToolFavorites';

// --- Analysis Display Component ---
interface AnalysisDisplayProps {
  analysis: HRAnalysis;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <section className="mb-12 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200/80">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
        AI in HR: 2026 Outlook
      </h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-slate-700 mb-3 flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Current Impact & Future Growth
          </h3>
          <p className="text-slate-600 leading-relaxed prose max-w-none">{analysis.currentImpact}</p>
          <p className="mt-4 text-slate-600 leading-relaxed prose max-w-none">{analysis.futureGrowth}</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            Top 5 Emerging HR Technologies
          </h3>
          <div className="space-y-5">
            {analysis.emergingTechnologies.map((tech: EmergingTechnology, index: number) => (
              <div key={index} className="p-4 border-l-4 border-indigo-500 bg-slate-50 rounded-r-lg hover:bg-indigo-50 transition-colors duration-200">
                <h4 className="font-bold text-indigo-900">{tech.name}</h4>
                <p className="mt-1 text-sm text-slate-600">{tech.description}</p>
                <p className="mt-2 text-sm text-slate-700 font-medium">
                  <span className="font-semibold text-slate-800">Potential Impact:</span> {tech.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Main App Component ---
const App: React.FC = () => {
  const [tools, setTools] = useState<HRTool[]>([]);
  const [deiTools, setDeiTools] = useState<HRTool[]>([]);
  const [analysis, setAnalysis] = useState<HRAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<HRTool | null>(null);
  const [sortType, setSortType] = useState<'default' | 'name' | 'category'>('default');
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Comparison State
  const [comparisonList, setComparisonList] = useState<HRTool[]>([]);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  // Check for shared tool in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareData = params.get('share');
    if (shareData) {
      try {
        const json = decodeURIComponent(atob(shareData));
        const tool = JSON.parse(json);
        if (tool && tool.name && tool.category) {
          setSelectedTool(tool);
        }
      } catch (e) {
        console.error("Error parsing shared tool data:", e);
      }
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const savedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
      if (savedRatings) {
        setRatings(JSON.parse(savedRatings));
      }

      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      const [fetchedTools, fetchedAnalysis, fetchedDEITools] = await Promise.all([
        fetchHRTools(),
        fetchHRAnalysis(),
        fetchDEITools()
      ]);

      setTools(fetchedTools);
      setAnalysis(fetchedAnalysis);
      setDeiTools(fetchedDEITools);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRateTool = (toolName: string, newRating: number) => {
    const newRatings = { ...ratings, [toolName]: newRating };
    setRatings(newRatings);
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(newRatings));
  };

  const handleToggleFavorite = (toolName: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(toolName) 
        ? prev.filter(f => f !== toolName) 
        : [...prev, toolName];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Comparison Logic
  const handleToggleCompare = (tool: HRTool) => {
    setComparisonList(prev => {
      const isSelected = prev.some(t => t.name === tool.name);
      if (isSelected) {
        return prev.filter(t => t.name !== tool.name);
      } else {
        if (prev.length >= 3) {
            alert("You can compare up to 3 tools at a time.");
            return prev;
        }
        return [...prev, tool];
      }
    });
  };

  const clearComparison = () => setComparisonList([]);


  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(tools.map(tool => tool.category))];
    uniqueCategories.sort();
    return ['all', ...uniqueCategories];
  }, [tools]);
  
  const filteredAndSortedTools = useMemo(() => {
    let result = [...tools];

    if (selectedCategory !== 'all') {
      result = result.filter(tool => tool.category === selectedCategory);
    }

    if (sortType === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    return result;
  }, [tools, sortType, selectedCategory]);

  const favoriteToolsList = useMemo(() => {
    // Combine all tools to search for favorites
    const allTools = [...tools, ...deiTools];
    // Filter unique tools that are in favorites
    return allTools.filter((tool, index, self) => 
      favorites.includes(tool.name) && 
      index === self.findIndex((t) => t.name === tool.name)
    );
  }, [tools, deiTools, favorites]);
  
  const handleOpenModal = (tool: HRTool) => {
    setSelectedTool(tool);
    // Clean URL if a share param exists to avoid confusion
    if (window.location.search.includes('share=')) {
        const url = new URL(window.location.href);
        url.searchParams.delete('share');
        window.history.replaceState({}, '', url);
    }
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
    // Clean URL if a share param exists
    if (window.location.search.includes('share=')) {
        const url = new URL(window.location.href);
        url.searchParams.delete('share');
        window.history.replaceState({}, '', url);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-red-200/80 max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">Service Temporarily Unavailable</h2>
          <p className="mt-2 text-slate-600">
            We're having trouble connecting to the AI service as it seems to be overloaded. Please wait a moment and try again.
          </p>
          <button
            onClick={loadData}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <>
        {analysis && <AnalysisDisplay analysis={analysis} />}
        
        {favoriteToolsList.length > 0 && (
          <section className="my-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-4 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Your Favorite Tools
            </h2>
             <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">
              A curated list of tools you've marked for quick access.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteToolsList.map((tool) => (
                <ToolCard 
                  key={tool.name} 
                  tool={tool} 
                  onClick={handleOpenModal}
                  rating={ratings[tool.name] || 0}
                  onRate={(rating) => handleRateTool(tool.name, rating)}
                  isSelected={comparisonList.some(t => t.name === tool.name)}
                  onToggleCompare={handleToggleCompare}
                  isFavorite={favorites.includes(tool.name)}
                  onToggleFavorite={() => handleToggleFavorite(tool.name)}
                />
              ))}
            </div>
            <div className="border-t border-slate-200 my-12"></div>
          </section>
        )}

        {deiTools.length > 0 && (
          <section className="my-12">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">
              Featured: DEI Innovation
            </h2>
            <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">
              Discover specialized tools designed to foster a more diverse, equitable, and inclusive workplace.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deiTools.map((tool) => (
                <ToolCard 
                  key={tool.name} 
                  tool={tool} 
                  onClick={handleOpenModal}
                  rating={ratings[tool.name] || 0}
                  onRate={(rating) => handleRateTool(tool.name, rating)}
                  isSelected={comparisonList.some(t => t.name === tool.name)}
                  onToggleCompare={handleToggleCompare}
                  isFavorite={favorites.includes(tool.name)}
                  onToggleFavorite={() => handleToggleFavorite(tool.name)}
                />
              ))}
            </div>
            <div className="border-t border-slate-200 my-12"></div>
          </section>
        )}

        <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
                Illustrative HR Tools for 2026
            </h2>

            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/80">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-3">
                  <h3 className="font-semibold text-slate-800 mb-3">Filter by Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${selectedCategory === category ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 shadow'}`}
                      >
                        {category === 'all' ? 'All' : category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0 lg:pl-6 lg:col-span-2">
                  <h3 className="font-semibold text-slate-800 mb-3">Sort by</h3>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
                    <button 
                      onClick={() => setSortType('default')} 
                      className={`w-full text-center px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${sortType === 'default' ? 'bg-white text-indigo-700 shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
                      Default
                    </button>
                    <button 
                      onClick={() => setSortType('name')} 
                      className={`w-full text-center px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${sortType === 'name' ? 'bg-white text-indigo-700 shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
                      Name
                    </button>
                    <button 
                      onClick={() => setSortType('category')} 
                      className={`w-full text-center px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${sortType === 'category' ? 'bg-white text-indigo-700 shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
                      Category
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        {filteredAndSortedTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedTools.map((tool) => (
              <ToolCard 
                key={tool.name} 
                tool={tool} 
                onClick={handleOpenModal}
                rating={ratings[tool.name] || 0}
                onRate={(rating) => handleRateTool(tool.name, rating)}
                isSelected={comparisonList.some(t => t.name === tool.name)}
                onToggleCompare={handleToggleCompare}
                isFavorite={favorites.includes(tool.name)}
                onToggleFavorite={() => handleToggleFavorite(tool.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-slate-200/80">
            <h3 className="text-2xl font-semibold text-slate-700">No tools found</h3>
            <p className="mt-2 text-slate-500">
              There are no tools that match the selected category. Try selecting another category or resetting the filters.
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24">
        {renderContent()}
      </main>
      
      {/* Floating Comparison Bar */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-8 left-0 right-0 z-40 animate-fade-in-down pointer-events-none">
            <div className="max-w-3xl mx-auto px-4 pointer-events-auto">
                <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-full shadow-2xl border border-slate-700 flex items-center justify-between px-6 text-white">
                    <div className="flex items-center space-x-4">
                        <div className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/50">
                            {comparisonList.length}
                        </div>
                        <span className="text-sm font-medium text-slate-200 hidden sm:inline">
                            {comparisonList.length} {comparisonList.length === 1 ? 'tool' : 'tools'} selected
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                         <button 
                            onClick={clearComparison}
                            className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-2"
                        >
                            Clear
                        </button>
                        <button 
                            onClick={() => setIsComparing(true)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-105 active:scale-95"
                        >
                            Compare
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Modals */}
      {selectedTool && (
        <ToolDetailModal 
          tool={selectedTool} 
          onClose={handleCloseModal} 
          rating={ratings[selectedTool.name] || 0}
          onRate={(r) => handleRateTool(selectedTool.name, r)}
          isFavorite={favorites.includes(selectedTool.name)}
          onToggleFavorite={() => handleToggleFavorite(selectedTool.name)}
        />
      )}

      {isComparing && (
        <ComparisonModal 
            tools={comparisonList} 
            onClose={() => setIsComparing(false)} 
            ratings={ratings}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default App;
