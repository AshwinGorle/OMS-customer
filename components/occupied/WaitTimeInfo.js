"use client";

import { Clock } from "lucide-react";

export default function WaitTimeInfo() {
  return (
    <div className="text-center space-y-2">
      <p className="text-muted-foreground">
        This table is currently in use. Please wait for it to become available or try another table.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Average wait time: 15-20 minutes</span>
      </div>
    </div>
  );
}