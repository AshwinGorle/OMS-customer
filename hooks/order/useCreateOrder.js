import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createOrder } from "@/redux/actions/order/orderActions";
import { orderActions } from "@/redux/slices/orderSlice";
import { useGetUser } from "../auth";

export const useCreateOrder = (setCartOrder) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.order.createOrder);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Order added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(orderActions.clearCreateOrderStats());
            // setOpen(false) // to close dialog
            setCartOrder(null);
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Orders.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(orderActions.clearCreateOrderStats());
            // setOpen(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleCreateOrder = (data, hotelId, tableId) => {
        console.log("hook-create-order-req:", data, hotelId, tableId);
        dispatch(createOrder(data, hotelId, tableId));
    };
   
    return {loading, handleCreateOrder};
};
