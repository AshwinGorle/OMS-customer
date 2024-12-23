

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
;
import { Button } from "@/components/ui/button";
import { useGetTableOrders } from "@/hooks/order/useGetTableOrders";
import { CartOrderCard } from "@/components/user/CartOrderCard";
import { OrderList } from "@/components/user/OrderList";
import OrderConfirmationDialog from "@/components/user/orders/OrderConfirmationDialog";


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
      <h1 className="text-2xl font-bold mb-4">Order Page</h1>
      <p className="mb-4">Table ID: {tableId}</p>
      
      {cartOrder && cartOrder.length > 0 ? (
        <CartOrderCard items={cartOrder} onUpdateCart={updateCart} tableId={tableId} hotelId={hotelId} setCartOrder={setCartOrder}/>
      ) : (
        <p>Your cart is empty.</p>
      )}


      {tableOrders && tableOrders.length && <OrderList orders={tableOrders}></OrderList>}
      <Button 
        className="mt-4"
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${hotelId}/${tableId}`)}
      >
        Go Back
      </Button>
      <OrderConfirmationDialog/>
    </div>
  );
};
   
export default MyOrderPage;

