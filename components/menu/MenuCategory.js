"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MenuCategory({ category, items, isExpanded, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          isExpanded ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-primary font-semibold ml-4">
                ₹{item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}