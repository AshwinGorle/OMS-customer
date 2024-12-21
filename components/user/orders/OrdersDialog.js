"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrdersList from "./OrdersList";

export default function OrdersDialog({ 
  open, 
  onOpenChange, 
  orders, 
  onUpdateQuantity,
  onRemoveItem,
  onProceedOrder 
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-md mx-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Your Orders</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <OrdersList
            orders={orders}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onProceedOrder={onProceedOrder}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}