

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { Spinner } from "../ui/spinner";
import { AlertTriangle } from 'lucide-react';
import { useDeleteOrder } from "@/hooks/order/useDeleteOrder";

export function DeleteOrderModal() {
  const dispatch = useDispatch();
  const {order, open} = useSelector((state) => state.order.deleteOrderDialogDetails); 

  const { loading, handleDeleteOrder } = useDeleteOrder();

  const handleDeleteOrderLocal = () => {
    if (order) handleDeleteOrder(order._id.toString());
  };

  const handleClose = () => {
    dispatch(orderActions.closeDeleteOrderDialog());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Order
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this order? This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          {order ? (
            <Button 
              variant="destructive" 
              onClick={handleDeleteOrderLocal} 
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
              {loading ? "Deleting..." : "Delete Order"}
            </Button>
          ) : (
            <Spinner />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



