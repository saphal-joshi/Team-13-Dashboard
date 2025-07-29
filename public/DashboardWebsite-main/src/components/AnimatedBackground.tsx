import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Very subtle gradient overlays for depth - only visible in dark mode */}
      <div className="hidden dark:block absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-teal-500/3 to-transparent rounded-full blur-3xl animate-pulse opacity-40" 
           style={{ animationDelay: '0s', animationDuration: '12s' }}></div>
      <div className="hidden dark:block absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-blue-500/3 to-transparent rounded-full blur-3xl animate-pulse opacity-30" 
           style={{ animationDelay: '6s', animationDuration: '15s' }}></div>
    </div>
  );
};

export default AnimatedBackground;