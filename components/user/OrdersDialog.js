"use client";

import { ShoppingBag, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersButton({ onOrdersClick, onBillClick, itemCount }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
      <div className="max-w-lg mx-auto flex gap-4">
        <Button 
          className="flex-1 gap-2 shadow-sm" 
          onClick={onOrdersClick}
          variant="default"
          size="lg"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>My Orders</span>
          {itemCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-white text-primary rounded-full">
              {itemCount}
            </span>
          )}
        </Button>
        <Button 
          className="flex-1 gap-2 shadow-sm" 
          onClick={onBillClick}
          variant="outline"
          size="lg"
        >
          <Receipt className="h-5 w-5" />
          <span>My Bill</span>
        </Button>
      </div>
    </div>
  );
}