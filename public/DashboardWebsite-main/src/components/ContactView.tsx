
import React from 'react';
import { User, Mail, Briefcase } from 'lucide-react';

const ContactView: React.FC = () => {
  return (
    <div className="flex-1 bg-background dark:bg-black p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
              <img 
                src="/lovable-uploads/5b7c6cd2-0d89-48f3-8d12-2603c3d6b47f.png" 
                alt="Serena Sana"
                className="w-24 h-24 object-cover"
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-black dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
            Serena Sana
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-card dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-border dark:border-slate-700/50 hover:border-gray-700 dark:hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/10 dark:hover:shadow-cyan-500/10">
              <Mail className="w-5 h-5 text-gray-800 dark:text-cyan-400" />
              <span>Sana_Serena@bah.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-card dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-border dark:border-slate-700/50 hover:border-gray-700 dark:hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/10 dark:hover:shadow-cyan-500/10">
              <Briefcase className="w-5 h-5 text-gray-800 dark:text-cyan-400" />
              <span>Senior Lead Technologist</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
