
import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const ContactTab = () => {
  return (
    <div className="h-full p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 mb-8">Contact Information</h2>
        
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <img
                src="/lovable-uploads/92faba66-66db-49bb-9e98-01fbaf0976e3.png"
                alt="Serena Sana"
                className="w-32 h-32 rounded-full object-cover border-4 border-teal-400"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Serena Sana</h3>
              <p className="text-slate-300 mb-6">Senior Lead Technologist</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Mail className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">Sana_Serena@bah.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <MapPin className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">McLean, VA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
