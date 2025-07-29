
import React from 'react';
import { BarChart3, FileText, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'contact', label: 'Contact', icon: User },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-12">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-black dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
            Security and Technical Analysis Command Center
          </div>
        </div>
        <div className="text-center pb-4">
          <div className="text-sm md:text-base text-muted-foreground font-medium mb-4">
            Summer Games Team 13
          </div>
          <div className="flex w-full max-w-4xl mx-auto gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex-1 flex items-center gap-2 px-6 py-1.5 transition-all duration-300 font-semibold justify-center text-xs relative overflow-hidden rounded-lg hover:scale-105 hover:animate-glow ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-gray-800/90 via-black/80 to-gray-800/90 text-white shadow-xl shadow-gray-800/20 border border-gray-700 dark:from-teal-500/40 dark:via-blue-600/30 dark:to-teal-500/40 dark:text-black dark:shadow-teal-500/20 dark:border-teal-400/40'
                      : 'text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:via-gray-800/50 hover:to-gray-700/60 bg-muted/60 border border-border hover:border-gray-600 hover:shadow-lg hover:shadow-gray-700/10 dark:hover:text-black dark:hover:from-teal-500/20 dark:hover:via-blue-600/15 dark:hover:to-teal-500/20 dark:hover:border-teal-400/30 dark:hover:shadow-teal-500/10'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <Icon size={12} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
