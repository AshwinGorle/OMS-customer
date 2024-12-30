"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MenuHeader({ onBack }) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm backdrop-blur-lg bg-white/80">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Our Menu</h1>
          </div>
        </div>
      </div>
    </div>
  );
}