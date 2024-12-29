"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/price";
import { defaultDishImage } from "@/config";

export default function OrderItem({ order, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="flex gap-4 p-2 border rounded-lg">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={order.dish.image || defaultDishImage}
          alt={order.dish.name || 'Dish'}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{order.dish.name}</h3>
        <p className="text-sm text-muted-foreground">
          {formatPrice(order.dish.price)} x {order.quantity}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(order.dish.id, order.quantity - 1)}
            disabled={order.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{order.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(order.dish.id, order.quantity + 1)}
            disabled={order.quantity >= 10}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-500 ml-auto"
            onClick={() => onRemoveItem(order.dish.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}