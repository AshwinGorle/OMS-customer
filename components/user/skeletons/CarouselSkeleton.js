"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CarouselSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-48 rounded-lg" />
      <div className="flex justify-center">
        <Skeleton className="w-32 h-10" />
      </div>
    </div>
  );
}
// "use client";

// import { Skeleton } from "@/components/ui/skeleton";

// export default function CarouselSkeleton() {
//   return (
//     <div className="space-y-6">
//       <Skeleton className="w-full h-48 rounded-lg" />
//       <div className="flex justify-center">
//         <Skeleton className="w-32 h-10" />
//       </div>
//     </div>
//   );
// }