import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getTableOrders } from "@/redux/actions/order/orderActions";
import { orderActions } from "@/redux/slices/orderSlice";


export const useGetTableOrders = (tableId, params = {}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { refresh = false, setRefresh = null } = params;

  const { status, error, data } = useSelector(
    (state) => state.order.getTableOrders
  );
  const { toast } = useToast();
  const fetchTableOrders = useCallback(() => {
    if (refresh || !data && !error) {
      dispatch(getTableOrders(tableId));
      setRefresh(false);
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    fetchTableOrders();
  }, [fetchTableOrders]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setRefresh && setRefresh(false);
      // toast({
      //   title: "Success",
      //   description: "Table Orders fetched successfully.",
      //   variant: "success",
      // });
      dispatch(orderActions.clearGetTableOrderStatus());
      dispatch(orderActions.clearGetTableOrderError());
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to Fetch Table Orders.",
        variant: "destructive",
      });
      dispatch(orderActions.clearGetTableOrderStatus());
      dispatch(orderActions.clearGetTableOrderError());
    }
  }, [status, error, dispatch, toast, setRefresh]);

  const transformedOrders = useMemo(() => {
    return (
      data || {
        draft: [],
        pending: [],
        preparing: [],
        completed: [],
      }
    );
  }, [data]);

  return { orders: transformedOrders, loading };
};
