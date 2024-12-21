"use client";

import { Menu, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ActionButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 mt-8 mb-4">
      <Button 
        size="lg"
        className="w-full max-w-xs mx-auto shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => router.push('/menu')}
      >
        <Menu className="h-5 w-5 mr-2" />
        View Full Menu
      </Button>
      
      <Button 
        size="lg"
        variant="outline"
        className="w-full max-w-xs mx-auto shadow-sm hover:shadow-md transition-shadow"
        onClick={() => router.push('/scan')}
      >
        <QrCode className="h-5 w-5 mr-2" />
        Scan QR Code
      </Button>
    </div>
  );
}