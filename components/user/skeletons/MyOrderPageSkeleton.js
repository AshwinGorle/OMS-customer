import { Button } from "@/components/ui/button";

const ShimmerEffect = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
);

const MyOrderPageSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Back Button */}
      <div className="mt-4">
        <Button disabled className="opacity-50">
          <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full"></div>
          Go Back
        </Button>
      </div>

      {/* Page Title */}
      <ShimmerEffect className="h-8 w-48" />

      {/* Big Box / Div for Cart or Orders */}
      <div className="border rounded-lg p-6 space-y-4">
        {/* Shimmer for cart items or order list */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center space-x-4">
            <ShimmerEffect className="w-16 h-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <ShimmerEffect className="h-4 w-3/4" />
              <ShimmerEffect className="h-4 w-1/2" />
            </div>
            <ShimmerEffect className="w-20 h-8 rounded-md" />
          </div>
        ))}
      </div>

      {/* Additional shimmer for potential order list or other content */}
      <div className="space-y-4">
        {[1, 2].map((order) => (
          <div key={order} className="border rounded-lg p-4">
            <div className="space-y-2">
              <ShimmerEffect className="h-4 w-full" />
              <ShimmerEffect className="h-4 w-3/4" />
              <ShimmerEffect className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrderPageSkeleton;
