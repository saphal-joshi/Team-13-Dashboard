
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl border-b border-slate-700">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Summer Games Team 13 × Booz Allen Hamilton
            </h1>
            <p className="text-lg text-slate-300">AWS Security Dashboard Platform</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
