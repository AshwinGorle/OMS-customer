"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
;
import { Button } from "@/components/ui/button";
import { useGetTableOrders } from "@/hooks/order/useGetTableOrders";
import { CartOrderCard } from "@/components/user/CartOrderCard";
import { OrderList } from "@/components/user/OrderList";
import OrderConfirmationDialog from "@/components/user/orders/OrderConfirmationDialog";

import { ArrowLeft } from "lucide-react";
import { ShoppingCart } from "lucide-react";


const MyOrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tableId, hotelId } = useParams();

  const {loading : tableOrderLoading, orders : tableOrders} = useGetTableOrders(tableId);

  const [cartOrder, setCartOrder] = useState(null);

  useEffect(()=>{  console.log("Table orders ---------", tableOrders)},[tableOrders])

  useEffect(() => {
    const ordersFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    setCartOrder(ordersFromLocalStorage.items);
  }, []);

  const updateCart = (updatedItems) => {
    setCartOrder(updatedItems);
    localStorage.setItem('cart', JSON.stringify({ items: updatedItems }));
  };

  return (
    <div className="container mx-auto p-4">


      {/* back button to top mai shift kardiya hai bhai
      <Button 
        className="mt-4"
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${hotelId}/${tableId}`)}
      >
        <ArrowLeft/>
        Go Back
      </Button> */}

        {/* ye wapas se daal diya */}
        <Button 
          className="mt-4"
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${hotelId}/${tableId}`)}
        >
          <ArrowLeft/>
          Go Back
        </Button>



      <h1 className="text-2xl font-bold mb-4 mt-3">Order Page</h1>
      {/* <p className="mb-4">Table ID: {tableId}</p> */}
      

      {/* ye purana wala empty card wala code tha isko hata diya gaya hai
      isko hata diya hai , ab wapas se push kar rha hu */}
      {/* {cartOrder && cartOrder.length > 0 ? (
        <CartOrderCard items={cartOrder} onUpdateCart={updateCart} tableId={tableId} hotelId={hotelId} setCartOrder={setCartOrder}/>
      ) : (
        <p>Your cart is empty.</p>
      )} */}
{/* 
      {cartOrder && cartOrder.length > 0 ? (
          <CartOrderCard
            items={cartOrder}
            onUpdateCart={updateCart}
            tableId={tableId}
            hotelId={hotelId}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-600 p-6">
            <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500">
              Browse our menu and add items to your cart to get started.
            </p>
          </div>
      )} */}

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

      


      {tableOrders && tableOrders.length && <OrderList orders={tableOrders}></OrderList>}
      
      <OrderConfirmationDialog/>
    </div>
  );
};
   
export default MyOrderPage;

