"use client";

import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ActionButtons({ isRefreshing, onRefresh }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <Button 
        onClick={onRefresh}
        className="w-full gap-2"
        disabled={isRefreshing}
      >
        <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Checking status...' : 'Refresh Status'}
      </Button>
      
      <Button 
        variant="outline"
        className="w-full"
        onClick={() => router.push('/scan')}
      >
        Try Another Table
      </Button>
    </div>
  );
}