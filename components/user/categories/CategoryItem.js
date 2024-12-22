"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CategoryItem({ category, isSelected, onClick }) {
  return (
    <div 
      className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer"
      onClick={() => onClick(category)}
    >
      <div className={cn(
        "relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-offset-2 transition-all",
        isSelected ? "ring-primary" : "ring-gray-200"
      )}>
        <Image
          src={category.logo}
          alt={category.name}
          fill
          className="object-cover"
        />
      </div>
      <span className={cn(
        "text-sm font-medium",
        isSelected ? "text-primary" : "text-gray-600"
      )}>
        {category.name}
      </span>
    </div>
  );
}