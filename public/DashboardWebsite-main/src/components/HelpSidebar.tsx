import React, { useState } from 'react';
import { BarChart3 as ChartIcon, X, Shield, BarChart3, MessageSquare, FileText, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HelpSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const faqs = [
    {
      icon: Database,
      title: "Splunk",
      content: "Collects and organizes log data so you can monitor what's happening across your systems."
    },
    {
      icon: Shield,
      title: "Nessus",
      content: "A security assessment tool that scans devices and systems for known vulnerabilities, helping teams stay ahead of threats."
    },
    {
      icon: () => (
        <img 
          src="/lovable-uploads/75a74558-7d3d-4e5d-90fc-99f069793245.png" 
          alt="Active Directory" 
          className="w-4 h-4"
        />
      ),
      title: "Active Directory",
      content: "Manages user authentication and access control while logging events for auditing and threat detection."
    },
    {
      icon: FileText,
      title: "STIG Viewer",
      content: "A tool for reviewing and managing technologies to ensure systems meet DoD compliance standards."
    }
  ];

  return (
    <>
      {/* Floating Help Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border hover:bg-accent hover:scale-110 transition-all duration-300 hover:shadow-lg"
      >
        <ChartIcon className="h-4 w-4" />
        <span className="sr-only">Open help</span>
      </Button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-80 bg-background border-r shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Data Overview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-accent"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close help</span>
              </Button>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        {typeof Icon === 'function' && Icon.name === undefined ? (
                          <Icon />
                        ) : (
                          <Icon className="h-4 w-4 text-primary" />
                        )}
                        {faq.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">{faq.content}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpSidebar;