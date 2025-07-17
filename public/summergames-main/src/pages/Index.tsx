
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DashboardView from '@/components/DashboardView';
import DocumentsTab from '@/components/DocumentsTab';
import ContactTab from '@/components/ContactTab';
import ChatBot from '@/components/ChatBot';
import NotesPopup from '@/components/NotesPopup';
import TabNavigation from '@/components/TabNavigation';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDashboardToggle = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      <Header />

      {/* Main Content with Tabs - Unified Layout */}
      <main className="h-screen flex flex-col">
        <Tabs defaultValue="home" className="w-full flex-1 flex flex-col">
          <TabNavigation />

          <TabsContent value="home" className="flex-1 mt-0">
            {!showDashboard ? (
              <HeroSection onDashboardToggle={handleDashboardToggle} />
            ) : (
              <DashboardView onDashboardToggle={handleDashboardToggle} />
            )}
          </TabsContent>

          <TabsContent value="documents" className="flex-1 mt-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="contact" className="flex-1 mt-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <ContactTab />
          </TabsContent>
        </Tabs>
      </main>

      <NotesPopup />
      <ChatBot />
    </div>
  );
};

export default Index;
