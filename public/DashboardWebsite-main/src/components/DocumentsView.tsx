
import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const DocumentsView: React.FC = () => {
  const documents = [
    {
      title: 'NIST SP 800-37 Rev. 2',
      description: 'Risk Management Framework for Information Systems and Organizations',
      url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-37r2.pdf'
    },
    {
      title: 'NIST SP 800-53 Rev. 5',
      description: 'Security and Privacy Controls for Federal Information Systems and Organizations',
      url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf'
    },
    {
      title: 'NIST SP 800-60 Vol. 2 Rev. 1',
      description: 'Guide for Mapping Types of Information and Information Systems to Security Categories',
      url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-60v2r1.pdf'
    },
    {
      title: 'Cloud Computing SRG v1r3',
      description: 'Security Requirements Guide for Cloud Computing',
      url: 'https://rmf.org/wp-content/uploads/2018/05/Cloud_Computing_SRG_v1r3.pdf'
    }
  ];

  return (
    <div className="flex-1 bg-background dark:bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-black dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
            Security Documentation
          </h2>
          <p className="text-muted-foreground dark:text-slate-300">
            Access key security frameworks and guidelines
          </p>
        </div>
        
        <div className="grid gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="bg-card dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-border dark:border-slate-700/50 hover:border-gray-700 dark:hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/10 dark:hover:shadow-cyan-500/10">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-gray-800 dark:text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-1">{doc.title}</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm leading-relaxed">{doc.description}</p>
                  </div>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 dark:from-cyan-500 dark:to-blue-600 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/25 dark:hover:shadow-cyan-500/25 text-sm font-medium ml-4"
                >
                  <span>Open</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsView;
