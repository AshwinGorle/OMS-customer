"use client";

import { useCallback } from 'react';

export function useDishFiltering({
  dishes,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    // Clear category selection when searching
    if (query.trim()) {
      setSelectedCategory(null);
    }
  }, [setSearchQuery, setSelectedCategory]);

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    // Clear search query when selecting category
    setSearchQuery("");
  }, [setSelectedCategory, setSearchQuery]);

  const getFilteredDishes = useCallback(() => {
    // Show search results if there's a search query
    if (searchQuery.trim()) {
      return dishes.filter(dish => 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Show category dishes if a category is selected
    if (selectedCategory) {
      return dishes.filter(dish => dish.categoryId === selectedCategory.id);
    }
    
    // Return empty array if no search or category selected
    return [];
  }, [dishes, selectedCategory, searchQuery]);

  return {
    filteredDishes: getFilteredDishes(),
    handleSearch,
    handleCategoryClick
  };
}