"use client";

import { cn } from "@/lib/utils";

export default function CarouselIndicators({ total, current, onChange }) {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all",
            current === index ? "bg-white w-3" : "bg-white/60"
          )}
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
}