"use client";

import { ShoppingBag, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function OrdersButton({ onOrdersClick, onBillClick, itemCount, tableId, hotelId }) {
  const cartItemsCount = useSelector((state)=>state.order.cartItemsCount);

  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
      <div className="max-w-lg mx-auto flex gap-4">
        <Button 
          className="flex-1 gap-2 shadow-sm" 
          onClick={()=>router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user/my-orders/${hotelId}/${tableId}`)}
          variant="default"
          size="lg"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>{`My Orders `}</span>
          {cartItemsCount > -1 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-white text-primary rounded-full">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}