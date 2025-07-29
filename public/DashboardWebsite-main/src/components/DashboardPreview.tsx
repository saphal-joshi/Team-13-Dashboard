import React from 'react';
import { BarChart3, Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPreview = () => {
  return (
    <Card className="w-80 bg-background/95 backdrop-blur-sm border shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <BarChart3 className="h-4 w-4 text-primary" />
          Security Dashboard Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded border border-red-500/20">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            <div>
              <div className="font-medium">47 Critical</div>
              <div className="text-muted-foreground">Vulnerabilities</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded border border-green-500/20">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <div>
              <div className="font-medium">94% Secure</div>
              <div className="text-muted-foreground">Systems</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-primary/5 rounded border border-primary/20">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Compliance Score</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="font-bold text-primary">87%</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground pt-1">
          Live data from Nessus, Splunk, and NIST frameworks
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPreview;