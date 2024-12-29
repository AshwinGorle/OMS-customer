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
import { formatPrice } from "@/lib/utils/price";
import { defaultDishImage } from "@/config";
import { useDispatch } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";

export default function DishQuantityModal({
  open,
  onOpenChange,
  dish,
  onOrder,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddItemToCart = () => {
    // check cart exists or not
    let cart = localStorage.getItem("cart");
    // if exists then push item in that card
    if (!cart) {
      const initialCart = {
        items: [],
      };
      localStorage.setItem("cart", JSON.stringify(initialCart));
    }
    cart = JSON.parse(localStorage.getItem("cart"));
    let isDishAlreadyPresent = false;
    cart?.items?.forEach((cartItem, idx) => {
      if (cartItem.dish._id.toString() === dish._id.toString()) {
        cart.items[idx].quantity += quantity;// increment quantity
        isDishAlreadyPresent = true;
        return;
      }
    });
    if(!isDishAlreadyPresent) cart.items.push({ dish: dish, quantity: quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    // dispatch(orderActions.setCartItemsCount(cart?.items?.length)) // to show number of items on my order button
    dispatch(orderActions.setCartItemsCount(cart?.items?.length)) // to show number of items on my order button
     // to show number of items on my order button
    setQuantity(1);
    onOpenChange();
  };

  if (!dish) return null;

  const totalPrice = dish.price * quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-xs mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base sm:text-lg">
            Select Quantity
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4">
          <div className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden">
            <Image
              src={dish.logo || defaultDishImage}
              alt={dish.name || "dish"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm sm:text-base">{dish.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {dish.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-lg font-semibold w-6 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button className="w-full h-9 text-sm" onClick={handleAddItemToCart}>
            Add to Order - {formatPrice(totalPrice)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
