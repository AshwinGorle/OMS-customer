import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { dishActions } from "@/redux/slices/dishSlice";
import { getAllDishes } from "@/redux/actions/dish";

export const useGetAllDishes = (type = "dish", hotelId, loadContent = false, setLoadContent) => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.dish.getAllDishes); // Directly use this
    const { toast } = useToast();

    const fetchAllDishes = () => {
        console.log("loadcontent in dishes : ", loadContent)
        if ( loadContent  && !data ) {
            dispatch(getAllDishes(hotelId));
            if(setLoadContent) setLoadContent(false)
        }
    }

    useEffect(() => {
        fetchAllDishes();
    }, [fetchAllDishes, loadContent]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            // toast({
            //     title: "Success",
            //     description: "Dishes fetched successfully.",
            //     variant: "success",
            // });
            dispatch(dishActions.clearGetAllDishesStatus());
            dispatch(dishActions.clearGetAllDishesError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Dishes.",
                variant: "destructive",
            });
            dispatch(dishActions.clearGetAllDishesStatus());
            dispatch(dishActions.clearGetAllDishesError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedDishes = useMemo(() => {
        return data?.dishes || [];
    }, [data]);

    return { dishes: transformedDishes, loading };
};
