
import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardViewProps {
  onDashboardToggle: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onDashboardToggle }) => {
  return (
    <div className="h-full fade-in flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex justify-between items-center p-6 bg-slate-800 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-teal-400">AWS Security Intelligence Dashboard</h2>
        <Button 
          onClick={onDashboardToggle}
          className="bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
        >
          Back to Overview
        </Button>
      </div>
      
      <div className="flex-1 bg-slate-800 p-1">
        <div className="bg-white rounded-lg h-full overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/754810877713/dashboards/326af5ac-1b73-4496-8c66-65b84cea2924?directory_alias=SG25-AFTEAM13"
            className="border-0"
            title="Security Dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
