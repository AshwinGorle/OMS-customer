"use client";

import { useState } from "react";
import DishCard from "./dishes/DishCard";
import DishQuantityModal from "./dishes/DishQuantityModal";

export default function DishesSection({ dishes, selectedCategory, onAddToOrder }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleOrder = (quantity) => {
    onAddToOrder(selectedDish, quantity);
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  // const filteredDishes = selectedCategory
  //   ? dishes.filter(dish => dish.category._id.toString() === selectedCategory._id.toString())
  //   : [];

  const filteredDishes = selectedCategory
  ? dishes.filter(dish => dish.category && selectedCategory && dish.category._id.toString() === selectedCategory._id.toString())
  : [];

  if (!selectedCategory) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold px-1">{selectedCategory.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDishes.map((dish) => (
          <DishCard
            key={dish._id}
            dish={dish}
            onAddClick={() => handleAddClick(dish)}
          />
        ))}
      </div>

      <DishQuantityModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        dish={selectedDish}
        onOrder={handleOrder}
      />
    </div>
  );
}