"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-32" />
      <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2 flex-shrink-0">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-14 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}