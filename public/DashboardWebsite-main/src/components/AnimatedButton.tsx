import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Loader2 } from 'lucide-react';

interface AnimatedButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, disabled, isLoading }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const text = "See Dashboard";
  
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev >= text.length) {
          setTimeout(() => setVisibleLetters(0), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 150); // Slower letter animation - was 80
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-gradient-to-r from-primary to-primary/80 dark:from-button-primary dark:to-button-secondary hover:from-primary/90 hover:to-primary/70 dark:hover:from-button-primary-hover dark:hover:to-button-secondary-hover text-primary-foreground px-6 py-3 text-base md:text-lg font-bold rounded-lg shadow-xl hover:shadow-primary/25 dark:hover:shadow-button-primary/25 transition-all duration-300 transform hover:scale-110 hover:animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : (
        <BarChart3 className="w-5 h-5 mr-2" />
      )}
      <span className="relative bg-gradient-to-r from-white to-white dark:from-white dark:to-cyan-200 bg-clip-text text-transparent font-extrabold">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className={`transition-all duration-200 ${
              index < visibleLetters 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-2'
            }`}
          >
            {letter}
          </span>
        ))}
      </span>
    </Button>
  );
};

export default AnimatedButton;