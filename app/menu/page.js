"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import MenuCategory from "@/components/menu/MenuCategory";
import { menuData } from "@/data/menuData";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";

export default function MenuPage() {
  const {hotelId} = useParams();
  const { loading: dishesLoading, dishes } = useGetAllDishes(
      "dish",
      hotelId,
      true
  );
 console.log("dishes", dishes)
  // // bhai ye rha data console me dekh le
  // console.log("dishes in menue :",dishes);
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Menu</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-3">
          {Object.entries(menuData).map(([category, items]) => (
            <MenuCategory
              key={category}
              category={category}
              items={items}
              isExpanded={expandedCategory === category}
              onToggle={() => toggleCategory(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}