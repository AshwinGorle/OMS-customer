"use client";

import CategoryItem from "./categories/CategoryItem";



export default function CategoriesSection({
  categories,
  selectedCategory,
  onCategoryClick,
  BSC
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold px-1">Categories</h2>
      <div className="flex gap-4 px-1 overflow-x-auto hide-scrollbar">
        <CategoryItem
          key={BSC._id}
          category={BSC}
          isSelected={selectedCategory?._id === BSC._id}
          onClick={() => onCategoryClick(BSC)}
        />
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            isSelected={selectedCategory?._id === category._id}
            onClick={() => onCategoryClick(category)}
          />
        ))}
      </div>
    </div>
  );
}
