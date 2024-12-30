"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MenuItem from "./MenuItem";

export default function MenuCategory({ category, items, isExpanded, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
          <span className="text-sm text-gray-500">({items.length})</span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          isExpanded ? "max-h-[2000px]" : "max-h-0"
        )}
      >
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}