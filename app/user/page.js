"use client";

import { useState } from "react";
import OffersCarousel from "@/components/user/OffersCarousel";
import CategoriesSection from "@/components/user/CategoriesSection";
import DishesSection from "@/components/user/DishesSection";
import OrdersButton from "@/components/user/OrdersButton";
import OrdersDialog from "@/components/user/orders/OrdersDialog";
import OrderSuccessDialog from "@/components/user/orders/OrderSuccessDialog";
import { useOrders } from "@/hooks/useOrders";

import { offers, categories, dishes } from "@/data/menu";

export default function UserPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const { 
    orders, 
    addToOrder, 
    updateQuantity, 
    removeItem, 
    clearOrders, 
    getTotalItems 
  } = useOrders();

  const handleProceedOrder = () => {
    setIsOrdersDialogOpen(false);
    setIsSuccessDialogOpen(true);
    clearOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="p-4 space-y-6">
        <OffersCarousel offers={offers} />
        <CategoriesSection 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />
        <DishesSection 
          dishes={dishes}
          selectedCategory={selectedCategory}
          onAddToOrder={addToOrder}
        />
      </div>

      <OrdersButton 
        onOrdersClick={() => setIsOrdersDialogOpen(true)}
        onBillClick={() => console.log("View bill")}
        itemCount={getTotalItems()}
      />

      <OrdersDialog
        open={isOrdersDialogOpen}
        onOpenChange={setIsOrdersDialogOpen}
        orders={orders}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onProceedOrder={handleProceedOrder}
      />

      <OrderSuccessDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
      />
    </div>
  );
}