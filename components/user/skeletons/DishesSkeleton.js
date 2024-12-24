"use client";

import DishCardSkeleton from "./DishCardSkeleton";

export default function DishesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <DishCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}