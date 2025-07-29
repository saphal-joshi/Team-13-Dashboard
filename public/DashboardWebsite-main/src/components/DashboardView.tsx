
import React from 'react';

interface DashboardViewProps {
  onDashboardToggle: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onDashboardToggle }) => {
  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex items-center justify-center px-6 py-2 bg-black/80">
        <button
          onClick={onDashboardToggle}
          className="bg-gradient-to-r from-primary to-primary/80 dark:from-button-primary dark:to-button-secondary hover:from-primary/90 hover:to-primary/70 dark:hover:from-button-primary-hover dark:hover:to-button-secondary-hover text-primary-foreground px-4 py-2 text-sm font-bold rounded-lg shadow-xl hover:shadow-primary/25 dark:hover:shadow-button-primary/25 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to Overview
        </button>
      </div>
      
      <div className="flex-1 bg-black p-1">
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
