
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, FileText, User } from 'lucide-react';

const TabNavigation = () => {
  return (
    <TabsList className="grid w-full grid-cols-3 mb-0 rounded-none bg-slate-800 border-b border-slate-700">
      <TabsTrigger 
        value="home" 
        className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-teal-400"
      >
        <BarChart3 className="h-4 w-4" />
        <span>Dashboard</span>
      </TabsTrigger>
      <TabsTrigger 
        value="documents" 
        className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-teal-400"
      >
        <FileText className="h-4 w-4" />
        <span>Documents</span>
      </TabsTrigger>
      <TabsTrigger 
        value="contact" 
        className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-teal-400"
      >
        <User className="h-4 w-4" />
        <span>Contact</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
