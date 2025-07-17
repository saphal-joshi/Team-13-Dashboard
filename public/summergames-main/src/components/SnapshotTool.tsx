
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Download, Pen, Square, Circle, Type, X } from 'lucide-react';

const SnapshotTool = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotationMode, setAnnotationMode] = useState<'pen' | 'text' | 'square' | 'circle'>('pen');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const captureScreen = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      
      // Wait for video to load
      await new Promise(resolve => {
        video.onloadedmetadata = resolve;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        // Set up annotation canvas
        const annotationCanvas = canvasRef.current;
        if (annotationCanvas) {
          annotationCanvas.width = Math.min(canvas.width, 800);
          annotationCanvas.height = Math.min(canvas.height, 600);
          const annotationCtx = annotationCanvas.getContext('2d');
          if (annotationCtx) {
            const img = new Image();
            img.onload = () => {
              annotationCtx.drawImage(img, 0, 0, annotationCanvas.width, annotationCanvas.height);
            };
            img.src = imageData;
          }
        }
      }
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
      
      setIsAnnotating(true);
      setIsCapturing(false);
    } catch (err) {
      console.error('Error capturing screen:', err);
      setIsCapturing(false);
    }
  };

  const downloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `dashboard-snapshot-${new Date().toISOString().slice(0, 19)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (annotationMode === 'pen') {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setIsDrawing(true);
        setLastPosition({ x, y });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && annotationMode === 'pen') {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        setLastPosition({ x, y });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="fixed bottom-20 left-6 z-40">
      {/* Capture Button */}
      {!isCapturing && !isAnnotating && (
        <Button
          onClick={captureScreen}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-2xl transition-all duration-300 hover:scale-105 mb-2"
          size="default"
        >
          <Camera className="h-4 w-4 mr-2" />
          Snapshot & Annotate
        </Button>
      )}

      {/* Screen Capture Loading */}
      {isCapturing && (
        <div className="bg-slate-800 rounded-lg p-4 shadow-2xl border border-slate-600">
          <div className="text-center text-white mb-4">
            <p>Select the screen to capture...</p>
          </div>
        </div>
      )}

      {/* Annotation Tools */}
      {isAnnotating && (
        <div className="bg-slate-800 rounded-lg p-4 shadow-2xl border border-slate-600 max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setAnnotationMode('pen')}
                size="sm"
                variant={annotationMode === 'pen' ? 'default' : 'outline'}
                className="border-slate-600"
              >
                <Pen className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setAnnotationMode('text')}
                size="sm"
                variant={annotationMode === 'text' ? 'default' : 'outline'}
                className="border-slate-600"
              >
                <Type className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setAnnotationMode('square')}
                size="sm"
                variant={annotationMode === 'square' ? 'default' : 'outline'}
                className="border-slate-600"
              >
                <Square className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setAnnotationMode('circle')}
                size="sm"
                variant={annotationMode === 'circle' ? 'default' : 'outline'}
                className="border-slate-600"
              >
                <Circle className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={() => {
                setIsAnnotating(false);
                setCapturedImage(null);
              }}
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <canvas
            ref={canvasRef}
            className="border border-slate-600 rounded max-w-full max-h-96 bg-white cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          
          <div className="flex space-x-2 mt-4">
            <Button onClick={downloadSnapshot} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnapshotTool;
