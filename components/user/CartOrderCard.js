"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";

export function CartOrderCard({ items: initialItems, onUpdateCart, hotelId, tableId }) {
  const [items, setItems] = useState(initialItems);
  const { loading: createOrderLoading, handleCreateOrder } = useCreateOrder();
  const [note, setNote] = useState("");

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const updateQuantity = (id, change) => {
    const updatedItems = items
      .map((item) =>
        item.dish._id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
    onUpdateCart(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.dish._id !== id);
    setItems(updatedItems);
    onUpdateCart(updatedItems);
  };


  const handlePlaceOrder = () => {
    let cart = localStorage.getItem("cart");
    if (!cart || JSON.stringify(cart)?.items?.length == 0) {
      toast({
        title: "Success",
        description: "Can't create order, Cart is Empty.",
        variant: "destructive", // Optional, for success styling
      });
    } else {
      cart = JSON.parse(cart);
      const dishesInApiFormate = cart?.items?.map((item) => {
        return {
          dishId: item.dish._id,
          quantity: item.quantity,
        };
      });
      console.log("formatted order ------,", dishesInApiFormate); 
      const newOrderData = {
        dishes: dishesInApiFormate,
        customerName : localStorage.getItem('customerName') || "Customer XYZ",
        note,
      }
      console.log("new Order Data ---", newOrderData)
      handleCreateOrder(newOrderData, hotelId, tableId);
    }
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.dish._id} className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src={item.dish.logo}
                alt={item.dish.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.dish.name}</h3>
              <p className="text-sm text-gray-500">${item.dish.price}</p>
              {item.dish.bestSeller && (
                <Badge variant="secondary" className="mt-1">
                  Best Seller
                </Badge>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.dish._id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.dish._id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeItem(item.dish._id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div>
          <div>Notes</div>
          <Input type='text' value={note} onChange={(e)=>setNote(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${totalAmount.toFixed(2)}</span>
        </div>
        <Button onClick={() => handlePlaceOrder()} className="w-full">
          {createOrderLoading ? <Spinner/> : "Place Order"}
        </Button>
      </CardFooter>
    </Card>
  );
}
