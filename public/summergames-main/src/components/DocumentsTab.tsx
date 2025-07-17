
import React from 'react';
import { FileText, Download, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentsTab = () => {
  const documents = [
    {
      title: "NIST SP 800-53r5",
      description: "Security and Privacy Controls for Information Systems and Organizations",
      url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    },
    {
      title: "NIST SP 800-60v2r1", 
      description: "Guide for Mapping Types of Information and Information Systems to Security Categories",
      url: "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-60v2r1.pdf"
    },
    {
      title: "NIST SP 800-37r2",
      description: "Risk Management Framework for Information Systems and Organizations",
      url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-37r2.pdf"
    },
    {
      title: "STIG Viewer",
      description: "Security Technical Implementation Guide (STIG) compliance and vulnerability assessment tool",
      url: "https://stigviewer.com/stigs"
    }
  ];

  return (
    <div className="h-full p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 mb-8">Security Documentation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-teal-500 transition-colors">
              <FileText className="h-8 w-8 text-teal-400 mb-4" />
              <h3 className="font-semibold text-white mb-2">{doc.title}</h3>
              <p className="text-slate-300 text-sm mb-4 line-clamp-3">{doc.description}</p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;
