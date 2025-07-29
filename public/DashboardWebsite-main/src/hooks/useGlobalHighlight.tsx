import { useState, useCallback, useEffect, createContext, useContext } from 'react';

interface HighlightContextType {
  highlightMode: boolean;
  highlights: string[];
  setHighlightMode: (mode: boolean) => void;
  addHighlight: (text: string) => void;
  clearHighlights: () => void;
}

const HighlightContext = createContext<HighlightContextType | undefined>(undefined);

export const useGlobalHighlight = () => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useGlobalHighlight must be used within a HighlightProvider');
  }
  return context;
};

export const HighlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highlightMode, setHighlightMode] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);

  const addHighlight = useCallback((text: string) => {
    setHighlights(prev => [...prev, text]);
  }, []);

  const clearHighlights = useCallback(() => {
    setHighlights([]);
  }, []);

  const handleGlobalHighlight = useCallback(() => {
    if (!highlightMode) return;
    
    setTimeout(() => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const selectedText = selection.toString().trim();
        const range = selection.getRangeAt(0);
        
        // Check if selection is within notes section
        const notesSection = document.querySelector('[data-notes-section]');
        if (notesSection && notesSection.contains(range.commonAncestorContainer)) {
          console.log('Skipping highlight - inside notes section');
          return;
        }
        
        console.log('Global highlight - Selected text:', selectedText);
        
        // Create highlight span
        const highlightSpan = document.createElement('span');
        highlightSpan.style.backgroundColor = '#fef08a'; // yellow-200
        highlightSpan.style.padding = '2px 0px';
        highlightSpan.style.borderRadius = '2px';
        highlightSpan.className = 'page-highlight';
        
        try {
          // Surround the selected text with highlight span
          range.surroundContents(highlightSpan);
          addHighlight(selectedText);
          
          // Show feedback
          const tempDiv = document.createElement('div');
          tempDiv.textContent = '✓ Text highlighted!';
          tempDiv.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 9999;
            background: #fef08a; color: #000; padding: 8px 16px;
            border-radius: 8px; font-size: 14px; pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #facc15;
          `;
          document.body.appendChild(tempDiv);
          setTimeout(() => {
            if (document.body.contains(tempDiv)) {
              document.body.removeChild(tempDiv);
            }
          }, 2000);
          
        } catch (error) {
          console.log('Could not highlight complex selection, adding to notes instead');
          addHighlight(selectedText);
        }
        
        // Clear selection after a brief moment
        setTimeout(() => selection.removeAllRanges(), 100);
      }
    }, 10);
  }, [highlightMode, addHighlight]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && highlightMode) {
      console.log('Exiting global highlight mode with ESC');
      setHighlightMode(false);
    }
  }, [highlightMode]);

  useEffect(() => {
    console.log('Global highlight mode:', highlightMode);
    
    if (highlightMode) {
      document.body.style.cursor = 'crosshair';
      document.body.style.userSelect = 'text';
      document.addEventListener('mouseup', handleGlobalHighlight);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
      document.removeEventListener('mouseup', handleGlobalHighlight);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
      document.removeEventListener('mouseup', handleGlobalHighlight);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [highlightMode, handleGlobalHighlight, handleEscapeKey]);

  return (
    <HighlightContext.Provider value={{
      highlightMode,
      highlights,
      setHighlightMode,
      addHighlight,
      clearHighlights
    }}>
      {children}
    </HighlightContext.Provider>
  );
};