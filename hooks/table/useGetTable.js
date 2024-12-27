import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { tableActions } from "@/redux/slices/tableSlice";
import { getTable } from "@/redux/actions/table";

export const useGetTable = (tableId) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.table.getTable); // Directly use this
    const { toast } = useToast();

    const fetchTable = useCallback(() => {
        if ( !data || data?.table?._id?.toString() != tableId ) {
            console.log("getchinng table")
            dispatch(getTable(tableId));
        }
    }, [dispatch, data]);

    useEffect(() => {
        fetchTable();
    }, [fetchTable]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            // setRefresh && setRefresh(false);
            // toast({
            //     title: "Success",
            //     description: "table fetched successfully.",
            //     variant: "success",
            // });
            dispatch(tableActions.clearGetTableStatus());
            dispatch(tableActions.clearGetTableError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch table.",
                variant: "destructive",
            });
            dispatch(tableActions.clearGetTableStatus());
            dispatch(tableActions.clearGetTableError());
        }
    }, [status, data, error, dispatch, toast]);

    const transformedTable = useMemo(() => {
        return data?.table || [];
    }, [data]);

    return { table: transformedTable, loading };
};
