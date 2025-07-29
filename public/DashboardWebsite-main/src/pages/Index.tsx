
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, ArrowLeft, Loader2 } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import ChatBot from '@/components/ChatBot';
import DashboardView from '@/components/DashboardView';
import Navigation from '@/components/Navigation';
import DocumentsView from '@/components/DocumentsView';
import ContactView from '@/components/ContactView';
import NotePad from '@/components/NotePad';
import ThemeToggle from '@/components/ThemeToggle';
import HelpSidebar from '@/components/HelpSidebar';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFullDashboard, setShowFullDashboard] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDashboardToggle = () => {
    if (!showFullDashboard) {
      setIsLoading(true);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowFullDashboard(true);
        setIsTransitioning(false);
      }, 1500); // Extended time to show loading
    } else {
      setShowFullDashboard(false);
    }
  };

  if (showFullDashboard) {
    return (
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <DashboardView onDashboardToggle={handleDashboardToggle} />
        <ChatBot />
        <NotePad />
        <ThemeToggle />
        <HelpSidebar />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'documents':
        return <DocumentsView />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <div className="flex-1 bg-background relative overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Loading overlay when transitioning */}
            {isTransitioning && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center">
                <div className="text-center">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Loading security dashboard...</p>
                    </div>
                  ) : (
                    <>
                      <Button
                        className="bg-gradient-to-r from-primary to-primary/80 dark:from-teal-500 dark:to-blue-600 hover:from-primary/90 hover:to-primary/70 dark:hover:from-teal-400 dark:hover:to-blue-500 text-primary-foreground dark:text-white px-4 py-1.5 text-xs font-bold rounded-lg shadow-xl hover:shadow-primary/25 dark:hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
                      >
                        <BarChart3 className="w-3 h-3 mr-1.5" />
                        See Dashboard
                      </Button>
                      <button
                        onClick={handleDashboardToggle}
                        className="mt-4 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mx-auto text-sm"
                      >
                        <ArrowLeft size={14} />
                        Back to Overview
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-6 py-8">
              {/* Header Section */}
              <div className="text-center mb-16 animate-fade-in max-w-6xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-800 to-black dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-8 pb-2" style={{lineHeight: '1.4'}}>
                  Visualizing Security Data with One Click
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light px-4 mt-4">
                  STACC uses AWS QuickSight to turn your security logs into clear, actionable dashboards, while an integrated chatbot delivers instant compliance insights based on DoD and DISA regulations.
                </p>
              </div>

              {/* Main CTA Button */}
              <div className="text-center mt-8">
                <AnimatedButton
                  onClick={handleDashboardToggle}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-background flex flex-col transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
      <ChatBot />
      <NotePad />
      <ThemeToggle />
      <HelpSidebar />
    </div>
  );
};

export default Index;
