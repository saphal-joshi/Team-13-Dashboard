
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, X, Download, Maximize2, Minimize2 } from 'lucide-react';

const NotesPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [size, setSize] = useState({ width: 500, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);

  const exportNotes = () => {
    const element = document.createElement('a');
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'dashboard-notes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    if (!isMaximized) {
      setIsResizing(true);
      setResizeHandle(handle);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (isResizing && !isMaximized) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      let newSize = { ...size };
      let newPosition = { ...position };

      if (resizeHandle.includes('right')) {
        newSize.width = Math.max(300, size.width + deltaX);
      }
      if (resizeHandle.includes('left')) {
        newSize.width = Math.max(300, size.width - deltaX);
        newPosition.x = position.x + deltaX;
      }
      if (resizeHandle.includes('bottom')) {
        newSize.height = Math.max(200, size.height + deltaY);
      }
      if (resizeHandle.includes('top')) {
        newSize.height = Math.max(200, size.height - deltaY);
        newPosition.y = position.y + deltaY;
      }

      setSize(newSize);
      setPosition(newPosition);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle('');
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, size, position]);

  return (
    <>
      {/* Notes Button - Bottom Left */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg transition-all duration-300 hover:scale-105 z-30 border-0"
        size="sm"
      >
        <StickyNote className="h-3 w-3 mr-1" />
        Notes
      </Button>

      {/* Notes Popup - Resizable */}
      {isOpen && (
        <div 
          className={`fixed bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-xl shadow-2xl border border-amber-200/30 backdrop-blur-sm animate-scale-in z-50 ${
            isMaximized 
              ? 'inset-4' 
              : ''
          }`}
          style={!isMaximized ? { 
            left: position.x, 
            top: position.y, 
            width: size.width, 
            height: size.height 
          } : {}}
        >
          {/* Resize Handles */}
          {!isMaximized && (
            <>
              {/* Corner handles */}
              <div 
                className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
              />
              <div 
                className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
              />
              <div 
                className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
              />
              <div 
                className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
              />
              
              {/* Edge handles */}
              <div 
                className="absolute top-0 left-3 right-3 h-1 cursor-n-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
              />
              <div 
                className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
              />
              <div 
                className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
              />
              <div 
                className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize z-10"
                onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
              />
            </>
          )}

          {/* Header */}
          <div 
            className={`bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-white p-3 rounded-t-xl flex items-center justify-between shadow-lg ${
              !isMaximized ? 'cursor-move' : ''
            }`}
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-white/20 rounded-lg">
                <StickyNote className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-base tracking-wide">Dashboard Notes</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                onClick={toggleMaximize}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white h-7 w-7 p-0 transition-all duration-200 hover:scale-110"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              </Button>
              <Button
                onClick={exportNotes}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white h-7 w-7 p-0 transition-all duration-200 hover:scale-110"
                title="Export Notes"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-7 w-7 p-0 transition-all duration-200 hover:scale-110"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4" style={{ height: 'calc(100% - 60px)' }}>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start taking notes..."
              className="w-full h-full bg-white/80 border border-amber-200/50 focus:ring-amber-400 focus:border-amber-400 text-slate-800 resize-none text-sm leading-relaxed shadow-inner rounded-lg transition-all duration-200 hover:bg-white/90 focus:bg-white/95"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NotesPopup;
