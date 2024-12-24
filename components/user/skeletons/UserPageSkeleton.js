"use client";

import CarouselSkeleton from "./CarouselSkeleton";
import CategoriesSkeleton from "./CategoriesSkeleton";
import DishesSkeleton from "./DishesSkeleton";

export default function UserPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="p-4 space-y-6">
        <CarouselSkeleton />
        <CategoriesSkeleton />
        <DishesSkeleton />
      </div>
    </div>
  );
}