import { CheckCircle } from "lucide-react";

export const CompleteTableShimmer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
      {/* Animated Success Icon */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full bg-green-200 opacity-50 blur-lg animate-pulse-fast"
          style={{ animationDuration: "2s" }}
        ></div>
        <div className="relative">
          <CheckCircle
            className="w-20 h-20 text-green-500 animate-bounce-fast"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center space-y-2 animate-fade-in-fast">
        <h1 className="text-2xl font-semibold text-gray-800">Table Check Done</h1>
        <p className="text-gray-600 text-md">You may now proceed with your order.</p>
      </div>
    </div>
  );
};

export default CompleteTableShimmer;
