"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import MenuCategory from "@/components/menu/MenuCategory";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
import MenuHeader from "@/components/menu/MenuHeader";

const organizeDishes = (dishes) => {
  const categorizedDishes = dishes.reduce((acc, dish) => {
    const categoryName = dish.category ? dish.category.name : "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(dish);
    return acc;
  }, {});

  // Sort categories alphabetically, but keep "Uncategorized" at the end
  return Object.entries(categorizedDishes).sort(([a], [b]) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });
};

export default function MenuPage() {
  const {id : hotelId} = useParams();
  console.log("hotelId in menue", hotelId);
  const { loading: dishesLoading, dishes } = useGetAllDishes(
      "dish",
      hotelId,
      true
  );

  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const categorizedDishes = organizeDishes(dishes);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

return (
  <div className="min-h-screen bg-gray-50/50">
    <MenuHeader onBack={() => router.back()} />

    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="space-y-4">
        {categorizedDishes.map(([categoryName, items]) => (
          <MenuCategory
            key={categoryName}
            category={categoryName}
            items={items}
            isExpanded={expandedCategory === categoryName}
            onToggle={() => toggleCategory(categoryName)}
          />
        ))}
      </div>
    </div>
  </div>
);
}