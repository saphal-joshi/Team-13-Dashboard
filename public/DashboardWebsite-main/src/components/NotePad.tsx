
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StickyNote, X, Download, Minus, Highlighter, MousePointer } from 'lucide-react';
import { useGlobalHighlight } from '@/hooks/useGlobalHighlight';

const NotePad: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState('');
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 300 });
  const [size, setSize] = useState({ width: 350, height: 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const { highlightMode, highlights, setHighlightMode } = useGlobalHighlight();
  const notepadRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      const rect = notepadRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y)),
        });
      } else if (isResizing) {
        const rect = notepadRef.current?.getBoundingClientRect();
        if (rect) {
          setSize({
            width: Math.max(250, e.clientX - rect.left),
            height: Math.max(150, e.clientY - rect.top),
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, size]);

  // Update notes when highlights change
  useEffect(() => {
    if (highlights.length > 0) {
      const latestHighlight = highlights[highlights.length - 1];
      setNotes(prev => prev + (prev ? '\n\n' : '') + `Highlighted: "${latestHighlight}"`);
    }
  }, [highlights]);

  const clearAllHighlights = () => {
    // Remove all highlight spans from the page
    const highlightSpans = document.querySelectorAll('.page-highlight');
    highlightSpans.forEach(span => {
      const parent = span.parentNode;
      if (parent) {
        parent.insertBefore(document.createTextNode(span.textContent || ''), span);
        parent.removeChild(span);
        parent.normalize(); // Merge adjacent text nodes
      }
    });
  };

  const exportNotes = () => {
    const highlightTexts = Array.from(document.querySelectorAll('.page-highlight')).map((el, i) => `${i + 1}. ${el.textContent}`);
    const notesWithHighlights = notes + (highlightTexts.length > 0 ? 
      '\n\n=== PAGE HIGHLIGHTS ===\n' + highlightTexts.join('\n') : '');
    const blob = new Blob([notesWithHighlights], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes-with-highlights.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-50 border border-yellow-400/50 hover:shadow-yellow-500/25 flex items-center gap-2"
      >
        <StickyNote size={18} />
        <span className="text-sm font-medium">Notes</span>
      </button>
    );
  }

  return (
      <div
        data-notes-section
        ref={notepadRef}
        className="fixed bg-yellow-50/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-yellow-200/50 z-50"
        style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="drag-handle bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between cursor-move shadow-lg">
        <div className="flex items-center gap-2">
          <StickyNote size={16} />
          <span className="font-semibold">Notes</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHighlightMode(!highlightMode)}
            className={`p-1.5 rounded-lg transition-colors ${
              highlightMode 
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg' 
                : 'hover:bg-white/20'
            }`}
            title={highlightMode ? "Exit highlight mode (ESC) - Highlight text on page" : "Enter highlight mode to highlight text on page"}
          >
            {highlightMode ? <MousePointer size={14} /> : <Highlighter size={14} />}
          </button>
          <button
            onClick={clearAllHighlights}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Clear all page highlights"
          >
            <X size={14} />
          </button>
          <button
            onClick={exportNotes}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Export notes with highlights"
          >
            <Download size={14} />
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Minus size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div data-notes-section>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here... Use the highlighter to highlight text on the page!"
          className="w-full h-full p-3 border-0 outline-none resize-none rounded-b-2xl bg-transparent placeholder-slate-500 dark:placeholder-slate-400 text-sm font-medium"
          style={{ 
            height: size.height - 48,
            color: '#000000' // Force black text always
          }}
        />
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      >
        <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-yellow-400"></div>
      </div>
    </div>
  );
};

export default NotePad;
