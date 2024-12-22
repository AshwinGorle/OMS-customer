"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OccupiedStatus from "@/components/occupied/OccupiedStatus";
import WaitTimeInfo from "@/components/occupied/WaitTimeInfo";
import ActionButtons from "@/components/occupied/ActionButtons";

export default function OccupiedPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);


  // yaha par refresh logic likh dena bhai , refresh karne table status show karna hai
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Here you would typically make an API call to check the table status
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo purposes, we'll just refresh the page
      // In a real app, you would check the table status and redirect accordingly
      window.location.reload();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <OccupiedStatus />
        <CardContent className="space-y-6">
          <WaitTimeInfo />
          <ActionButtons 
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Need assistance? Please ask our staff for help
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}