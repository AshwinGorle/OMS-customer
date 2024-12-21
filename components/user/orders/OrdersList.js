"use client";

import OrderItem from "./OrderItem";
import { formatPrice } from "@/lib/utils/price";
import { Button } from "@/components/ui/button";

export default function OrdersList({ 
  orders, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedOrder 
}) {
  const calculateTotal = () => {
    return orders.reduce((total, order) => total + (order.dish.price * order.quantity), 0);
  };

  if (orders.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No items in your order yet
      </p>
    );
  }

  return (
    <>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {orders.map((order) => (
          <OrderItem
            key={order.dish.id}
            order={order}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total Amount:</span>
          <span className="font-semibold">{formatPrice(calculateTotal())}</span>
        </div>
        <Button className="w-full" onClick={onProceedOrder}>
          Proceed Order
        </Button>
      </div>
    </>
  );
}