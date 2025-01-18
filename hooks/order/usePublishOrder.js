import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { publishOrder } from "@/redux/actions/order";
import { orderActions } from "@/redux/slices/orderSlice";

export const usePublishOrder = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.order.publishOrder);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Order placed successfully.",
                variant: "default", // Optional, for success styling
            });
            dispatch(orderActions.clearPublishOrderError());
            dispatch(orderActions.clearPublishOrderStatus());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Publish Order, Retry",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(orderActions.clearPublishOrderError());
            dispatch(orderActions.clearPublishOrderStatus());
        }
    }, [status, error, dispatch, toast]);

    const handlePublishOrder = (orderId) => {
        console.log("hook-publish-order-req: order Id -> ",orderId );
        dispatch(publishOrder(orderId));
    };
   
    return {loading, handlePublishOrder};
};
