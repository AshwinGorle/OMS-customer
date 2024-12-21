"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils/price";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BillDialog({ open, onOpenChange, orders }) {
  const calculateSubtotal = () => {
    return orders.reduce((total, order) => total + (order.dish.price * order.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.05; // 5% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-md mx-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Your Bill</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 sm:space-y-4 mt-2">
          <ScrollArea className="max-h-[50vh] sm:max-h-[60vh]">
            <div className="space-y-2 sm:space-y-3 pr-4">
              {orders.map((order) => (
                <div key={order.dish.id} className="flex justify-between text-xs sm:text-sm">
                  <div>
                    <span>{order.dish.name}</span>
                    <span className="text-muted-foreground"> × {order.quantity}</span>
                  </div>
                  <span>{formatPrice(order.dish.price * order.quantity)}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t pt-3 space-y-1.5 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Tax (5%)</span>
              <span>{formatPrice(calculateTax(calculateSubtotal()))}</span>
            </div>
            <div className="flex justify-between font-bold text-sm sm:text-base border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}