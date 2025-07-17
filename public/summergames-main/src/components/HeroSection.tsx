
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

interface HeroSectionProps {
  onDashboardToggle: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onDashboardToggle }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="text-center px-6">
        <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
          Leveraging AWS Services to Improve Security Posture
        </h2>
        <p className="text-lg mb-12 max-w-4xl mx-auto leading-relaxed text-slate-300">
          Our interactive security analytics platform leverages Amazon QuickSight to transform raw Nessus and Splunk log data into intuitive dashboards, giving organizations clear visibility into their most critical vulnerabilities and risk areas. With an integrated chatbot assistant, users can also get instant answers to compliance questions based on NIST frameworks and STIG guidelines, making security operations both smarter and more efficient.
        </p>
        <Button 
          onClick={onDashboardToggle}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white text-xl px-12 py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <BarChart3 className="h-6 w-6 mr-3" />
          See Dashboard
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
