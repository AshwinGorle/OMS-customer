"use client";

import { UtensilsCrossed } from "lucide-react";

export default function EmptyCategory() {
  return (
    <div className="text-center py-12">
      <UtensilsCrossed className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">No category selected</h3>
      <p className="text-sm text-gray-500 mt-1">
        Please select a dish category to view items
      </p>
    </div>
  );
}