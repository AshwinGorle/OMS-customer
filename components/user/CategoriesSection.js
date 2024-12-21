"use client";

import CategoryItem from "./categories/CategoryItem";

export default function CategoriesSection({ categories, selectedCategory, onCategoryClick }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold px-1">Categories</h2>
      <div className="flex gap-4 px-1 overflow-x-auto hide-scrollbar">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={selectedCategory?.id === category.id}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}