import { useEffect, useState } from "react";
import { UtensilsCrossed } from "lucide-react"; // Replace with an appropriate dining table icon from Lucide if available

const TableLoader = () => {
  const [dots, setDots] = useState("");

  // Dynamic dots for "..." animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
      {/* Icon with subtle bounce animation */}
      <div className="animate-bounce">
        <UtensilsCrossed className="w-16 h-16 text-primary" />
      </div>

      {/* Smooth shimmer text animation */}
      <div className="text-xl font-semibold text-gray-800">
        <span className="animate-pulse">Checking your table{dots}</span>
      </div>
    </div>
  );
};

export default TableLoader;
