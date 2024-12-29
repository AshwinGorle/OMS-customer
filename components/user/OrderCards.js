"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingCart,
  Utensils,
  DollarSign,
  ClipboardList,
  IndianRupee,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePublishOrder } from "@/hooks/order/usePublishOrder";
import { useDispatch } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { Spinner } from "../ui/spinner";

export function OrderCard({ order, status }) {
  const dispatch = useDispatch();
  const { loading, handlePublishOrder } = usePublishOrder();

  const handleEditOrder = (order) => {
    console.log("order:::::::::", order);
    const cartOfEditingOrder = { items: [] };
    order.dishes.forEach((orderItem) => {
      cartOfEditingOrder.items.push({ dish: orderItem.dishId, quantity: orderItem.quantity });
    });
    localStorage.setItem('cart', JSON.stringify(cartOfEditingOrder))
    dispatch(orderActions.setCartDetails(cartOfEditingOrder));
  };

  // const calculateTotal = () => {
  //   return order.dishes.reduce((total, dish) => {
  //     return total + dish.dishId.price * dish.quantity;
  //   }, 0);
  // };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="pt-2 pb-2">
        <ul className="space-y-1">
          {order.dishes.map((dish) => (
            <li
              key={dish._id}
              className="flex justify-between items-center text-sm m-0 p-0"
            >
              <span className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-muted-foreground" />
                {dish.dishId.name} x{dish.quantity}
              </span>
              <span>${(dish.dishId.price * dish.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        {status === "draft" && (
          <div className="m-2 flex gap-4 justify-between ">
            <Button
              onClick={() => handleEditOrder(order)}
              variant="default"
              size="sm"
              className="min-w-16"
            >
              Edit
            </Button>
            <Button
              onClick={() =>
                dispatch(orderActions.openDeleteOrderDialog(order))
              }
              className="bg-red-500 text-white min-w-16"
              variant="outline"
              size="sm"
            >
              Delete
            </Button>
            <Button
              onClick={() => handlePublishOrder(order._id.toString())}
              className="bg-green-500 min-w-16 text-white"
              variant="outline"
              size="sm"
            >
              {loading ? <Spinner /> : "Confirm"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
