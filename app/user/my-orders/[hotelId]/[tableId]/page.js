"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetTableOrders } from "@/hooks/order/useGetTableOrders";
import { CartOrderCard } from "@/components/user/CartOrderCard";
import { OrderList } from "@/components/user/OrderList";
import OrderConfirmationDialog from "@/components/user/orders/OrderConfirmationDialog";

import { ArrowLeft, RotateCw } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import UserPageSkeleton from "@/app/user/loading";
import MyOrderPageSkeleton from "@/components/user/skeletons/MyOrderPageSkeleton";
import { DeleteOrderModal } from "@/components/user/DeleteOrderModal";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";

const MyOrderPage = () => {
  const [refresh , setRefresh] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { tableId, hotelId } = useParams();
  const { cart, update } = useSelector((state) => state.order.cartDetails);

  const { loading: tableOrderLoading, orders: tableOrders } =
    useGetTableOrders(tableId, {refresh, setRefresh});

  const [cartOrder, setCartOrder] = useState(null);

  useEffect(() => {
    console.log("Table orders ---------", tableOrders);
  }, [tableOrders]);

  useEffect(() => {
    const ordersFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || {
      items: [],
    };
    setCartOrder(ordersFromLocalStorage.items);
    dispatch(
      orderActions.setCartItemsCount(ordersFromLocalStorage.items?.length)
    );
  }, [cart, update]);

  const updateCart = (updatedItems) => {
    setCartOrder(updatedItems);
    dispatch(orderActions.setCartItemsCount(updatedItems?.length));
    localStorage.setItem("cart", JSON.stringify({ items: updatedItems }));
  };

  // adding shimmer to user page
  if (tableOrderLoading) {
    // return <UserPageSkeleton />;
    return <MyOrderPageSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* ye wapas se daal diya */}
      <Button
        className="mt-4"
        onClick={() =>
          router.push(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/${hotelId}/${tableId}`
          )
        }
      >
        <ArrowLeft />
        Go Back
      </Button>
      

      <h1 className="text-2xl font-bold mb-4 mt-3">Order Page</h1>
      {/* <p className="mb-4">Table ID: {tableId}</p> */}
      {cartOrder && cartOrder.length > 0 ? (
        <CartOrderCard
          items={cartOrder}
          onUpdateCart={updateCart}
          tableId={tableId}
          hotelId={hotelId}
          setCartOrder={setCartOrder}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 p-6">
          <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500">
            Browse our menu and add items to your cart to get started.
          </p>
        </div>
      )}
       <div className="w-full flex justify-center align-middle">
       <Button className='bg-green-600' onClick={()=>setRefresh(true)}>
        Refresh your Orders 
        <RotateCw/>
      </Button>
       </div>
      {tableOrders && tableOrders.length > 0 && (
        <OrderList orders={tableOrders}></OrderList>
      )}

      <OrderConfirmationDialog />
      <DeleteOrderModal />
    </div>
  );
};

export default MyOrderPage;
