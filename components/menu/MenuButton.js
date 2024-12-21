"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MenuButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-8 mb-4">
      <Button 
        size="lg"
        className="w-full max-w-xs shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => router.push('/menu')}
      >
        <Menu className="h-5 w-5 mr-2" />
        View Full Menu
      </Button>
    </div>
  );
}