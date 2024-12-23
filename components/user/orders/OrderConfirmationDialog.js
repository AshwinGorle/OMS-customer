"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePublishOrder } from "@/hooks/order/usePublishOrder";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function OrderConfirmationDialog(){
  const dispatch = useDispatch();  
  const {order , open} = useSelector((state)=>state.order.orderConfirmationDialog);
  const {loading , handlePublishOrder} = usePublishOrder();
  return (
    <Dialog open={open} onOpenChange={()=>dispatch(orderActions.closeOrderConfirmationDialog())}>
      <DialogHeader>
        <DialogTitle>
          Order Confirmation
        </DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-sm mx-auto text-center p-6">
         <div> Press Confirm to Confirm your order</div>
         <Button onClick={()=>handlePublishOrder(order._id.toString())}>{loading ? <Spinner/> : "Confirm Order"}</Button>
      </DialogContent>
    </Dialog>
  );
}