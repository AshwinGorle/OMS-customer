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
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Your Orders</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
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