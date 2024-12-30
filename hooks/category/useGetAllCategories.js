import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { categoryActions } from "@/redux/slices/categorySlice";
import { getAllCategories } from "@/redux/actions/category";


export const useGetAllCategories = (type="category", hotelId, loadContent, setLoadContent) => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.category.getAllCategories); // Directly use this
    const { toast } = useToast();

    const fetchAllCategories = useCallback(() => {
        if (loadContent && !data ) {
            dispatch(getAllCategories(hotelId));
            setLoadContent(false);
        }
    }, [dispatch, data, refresh, loadContent]);

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories, loadContent]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            // toast({
            //     title: "Success",
            //     description: "Categories fetched successfully.",
            //     variant: "success",
            // });
            dispatch(categoryActions.clearGetAllCategoriesStatus());
            dispatch(categoryActions.clearGetAllCategoriesError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Categories.",
                variant: "destructive",
            });
            dispatch(categoryActions.clearGetAllCategoriesStatus());
            dispatch(categoryActions.clearGetAllCategoriesError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedCategories = useMemo(() => {
        return data?.categories || [];
    }, [data]);

    return { categories: transformedCategories, loading };
};
