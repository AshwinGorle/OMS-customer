"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DishQuantityModal({ open, onOpenChange, dish, onOrder }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = () => {
    onOrder(quantity);
    setQuantity(1);
  };

  if (!dish) return null;

  const totalPrice = dish.price * quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs mx-auto">
        <DialogHeader>
          <DialogTitle>Select Quantity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative h-40 w-full rounded-lg overflow-hidden">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">{dish.name}</h3>
            <p className="text-sm text-muted-foreground">{dish.description}</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="pt-4">
            <Button className="w-full" onClick={handleSubmit}>
              Add to Order - ₹{totalPrice}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}