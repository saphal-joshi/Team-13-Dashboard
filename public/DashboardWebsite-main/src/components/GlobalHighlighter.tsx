import React from 'react';
import { useGlobalHighlight } from '@/hooks/useGlobalHighlight';

const GlobalHighlighter: React.FC = () => {
  const { highlightMode } = useGlobalHighlight();

  if (!highlightMode) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <span className="font-medium text-sm">Highlight Mode Active - Select text to highlight on page</span>
        <div className="text-xs opacity-75">(ESC to exit)</div>
      </div>
    </div>
  );
};

export default GlobalHighlighter;