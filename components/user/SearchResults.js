"use client";

import DishCard from "@/components/user/dishes/DishCard";

export default function SearchResults({ results, onAddToOrder }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold px-1">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddClick={() => onAddToOrder(dish, 1)}
          />
        ))}
      </div>
      {results.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No dishes found matching your search
        </div>
      )}
    </div>
  );
}