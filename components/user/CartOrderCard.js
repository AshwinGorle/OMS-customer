// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { useCreateOrder } from "@/hooks/order/useCreateOrder";
// import { Spinner } from "../ui/spinner";
// import { Input } from "../ui/input";

// export function CartOrderCard({ items: initialItems, onUpdateCart, hotelId, tableId, setCartOrder }) {
//   const [items, setItems] = useState(initialItems);
//   const { loading: createOrderLoading, handleCreateOrder } = useCreateOrder(setCartOrder);
//   const [note, setNote] = useState("");

//   useEffect(() => {
//     setItems(initialItems);
//   }, [initialItems]);

//   const updateQuantity = (id, change) => {
//     const updatedItems = items
//       .map((item) =>
//         item.dish._id === id
//           ? { ...item, quantity: Math.max(0, item.quantity + change) }
//           : item
//       )
//       .filter((item) => item.quantity > 0);

//     setItems(updatedItems);
//     onUpdateCart(updatedItems);
//   };

//   const removeItem = (id) => {
//     const updatedItems = items.filter((item) => item.dish._id !== id);
//     setItems(updatedItems);
//     onUpdateCart(updatedItems);
//   };


//   const handlePlaceOrder = () => {
//     let cart = localStorage.getItem("cart");
//     if (!cart || JSON.stringify(cart)?.items?.length == 0) {
//       toast({
//         title: "Success",
//         description: "Can't create order, Cart is Empty.",
//         variant: "destructive", // Optional, for success styling
//       });
//     } else {
//       cart = JSON.parse(cart);
//       const dishesInApiFormate = cart?.items?.map((item) => {
//         return {
//           dishId: item.dish._id,
//           quantity: item.quantity,
//         };
//       });
//       console.log("formatted order ------,", dishesInApiFormate); 
//       const newOrderData = {
//         dishes: dishesInApiFormate,
//         customerName : localStorage.getItem('customerName') || "Customer XYZ",
//         note,
//       }
//       console.log("new Order Data ---", newOrderData)
//       handleCreateOrder(newOrderData, hotelId, tableId);
//     }
//   };

//   const totalAmount = items.reduce(
//     (sum, item) => sum + item.dish.price * item.quantity,
//     0
//   );

//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <CardHeader>
//         <CardTitle>Your Cart</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {items.map((item) => (
//           <div key={item.dish._id} className="flex items-center space-x-4">
//             <div className="relative w-16 h-16">
//               <Image
//                 src={item.dish.logo}
//                 alt={item.dish.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-md"
//               />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.dish.name}</h3>
//               <p className="text-sm text-gray-500">${item.dish.price}</p>
//               {item.dish.bestSeller && (
//                 <Badge variant="secondary" className="mt-1">
//                   Best Seller
//                 </Badge>
//               )}
//             </div>
//             <div className="flex flex-col items-end space-y-2">
//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => updateQuantity(item.dish._id, -1)}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="w-8 text-center">{item.quantity}</span>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => updateQuantity(item.dish._id, 1)}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => removeItem(item.dish._id)}
//               >
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Remove
//               </Button>
//             </div>
//           </div>
//         ))}
//         <div>
//           <div>Notes</div>
//           <Input type='text' value={note} onChange={(e)=>setNote(e.target.value)} />
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-col items-stretch">
//         <div className="flex justify-between mb-4">
//           <span className="font-semibold">Total:</span>
//           <span className="font-semibold">${totalAmount.toFixed(2)}</span>
//         </div>
//         <Button onClick={() => handlePlaceOrder()} className="w-full">
//           {createOrderLoading ? <Spinner/> : "Place Order"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { useCreateOrder } from "@/hooks/order/useCreateOrder";
// import { Spinner } from "../ui/spinner";
// import { Input } from "../ui/input";

// export function CartOrderCard({ items: initialItems, onUpdateCart, hotelId, tableId, setCartOrder }) {
//   const [items, setItems] = useState(initialItems);
//   const { loading: createOrderLoading, handleCreateOrder } = useCreateOrder(setCartOrder);
//   const [note, setNote] = useState("");

//   useEffect(() => {
//     setItems(initialItems);
//   }, [initialItems]);

//   const updateQuantity = (id, change) => {
//     const updatedItems = items
//       .map((item) =>
//         item.dish._id === id
//           ? { ...item, quantity: Math.max(0, item.quantity + change) }
//           : item
//       )
//       .filter((item) => item.quantity > 0);

//     setItems(updatedItems);
//     onUpdateCart(updatedItems);
//   };

//   const removeItem = (id) => {
//     const updatedItems = items.filter((item) => item.dish._id !== id);
//     setItems(updatedItems);
//     onUpdateCart(updatedItems);
//   };


//   const handlePlaceOrder = () => {
//     let cart = localStorage.getItem("cart");
//     if (!cart || JSON.stringify(cart)?.items?.length == 0) {
//       toast({
//         title: "Success",
//         description: "Can't create order, Cart is Empty.",
//         variant: "destructive", // Optional, for success styling
//       });
//     } else {
//       cart = JSON.parse(cart);
//       const dishesInApiFormate = cart?.items?.map((item) => {
//         return {
//           dishId: item.dish._id,
//           quantity: item.quantity,
//         };
//       });
//       console.log("formatted order ------,", dishesInApiFormate); 
//       const newOrderData = {
//         dishes: dishesInApiFormate,
//         customerName : localStorage.getItem('customerName') || "Customer XYZ",
//         note,
//       }
//       console.log("new Order Data ---", newOrderData)
//       handleCreateOrder(newOrderData, hotelId, tableId);
//     }
//   };

//   const totalAmount = items.reduce(
//     (sum, item) => sum + item.dish.price * item.quantity,
//     0
//   );

//   return (
//     <Card className="w-full mx-auto bg-black text-white">
//     <CardHeader>
//       <CardTitle className="text-white text-2xl">Your Cart</CardTitle>
//     </CardHeader>
//     <CardContent className="space-y-6">
//       {items.map((item) => (
//         <div key={item.dish._id} className="flex items-center space-x-4">
//           <div className="relative w-16 h-16">
//             <Image
//               src={item.dish.logo}
//               alt={item.dish.name}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-md"
//             />
//           </div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-white">{item.dish.name}</h3>
//             <p className="text-sm text-gray-400">${item.dish.price.toFixed(2)}</p>
//             {item.dish.bestSeller && (
//               <Badge variant="outline" className="mt-1 border-yellow-500 text-yellow-500">
//                 Best Seller
//               </Badge>
//             )}
//           </div>
//           <div className="flex flex-col items-end space-y-2">
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => updateQuantity(item.dish._id, -1)}
//                 className="bg-gray-800 text-white hover:bg-gray-700"
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="w-8 text-center text-white">{item.quantity}</span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => updateQuantity(item.dish._id, 1)}
//                 className="bg-gray-800 text-white hover:bg-gray-700"
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={() => removeItem(item.dish._id)}
//               className="bg-red-600 hover:bg-red-700 text-white"
//             >
//               <Trash2 className="h-4 w-4 mr-2" />
//               Remove
//             </Button>
//           </div>
//         </div>
//       ))}
//       <div>
//         <div className="text-white mb-2">Notes</div>
//         <Input 
//           type="text" 
//           value={note} 
//           onChange={(e) => setNote(e.target.value)} 
//           className="bg-gray-800 text-white border-gray-700 focus:border-gray-600"
//         />
//       </div>
//     </CardContent>
//     <CardFooter className="flex flex-col items-stretch">
//       <div className="flex justify-between mb-4">
//         <span className="font-semibold text-white">Total:</span>
//         <span className="font-semibold text-white">${totalAmount.toFixed(2)}</span>
//       </div>
//       <Button 
//         onClick={handlePlaceOrder} 
//         className="w-full bg-green-600 hover:bg-green-700 text-white"
//       >
//         {createOrderLoading ? <Spinner className="text-white" /> : "Place Order"}
//       </Button>
//     </CardFooter>
//   </Card>
//   );
// }



// bhai ye naya MY ORDER CART WALA COMPONENT hai : developed by chirag patil
// agar kuch sahi nahi chala toh purana code COMMENT KAR diya hai
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, IndianRupee } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { defaultDishImage } from "@/config";

export function CartOrderCard({ items: initialItems, onUpdateCart, hotelId, tableId, setCartOrder }) {
  const [items, setItems] = useState(initialItems);
  const { loading: createOrderLoading, handleCreateOrder } = useCreateOrder(setCartOrder);
  const [note, setNote] = useState("");

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const updateQuantity = (id, change) => {
    const updatedItems = items
      .map((item) =>
        item.dish._id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
    onUpdateCart(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.dish._id !== id);
    setItems(updatedItems);
    onUpdateCart(updatedItems);
  };

  const handlePlaceOrder = () => {
    let cart = localStorage.getItem("cart");
    if (!cart || JSON.stringify(cart)?.items?.length == 0) {
      toast({
        title: "Error",
        description: "Can't create order, Cart is Empty.",
        variant: "destructive",
      });
    } else {
      cart = JSON.parse(cart);
      const dishesInApiFormate = cart?.items?.map((item) => ({
        dishId: item.dish._id,
        quantity: item.quantity,
      }));
      const newOrderData = {
        dishes: dishesInApiFormate,
        customerName: localStorage.getItem('customerName') || "Customer XYZ",
        note,
      };
      handleCreateOrder(newOrderData, hotelId, tableId);
    }
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-md">
      <CardHeader className="border-b border-gray-200 p-4">
        <CardTitle className="text-xl font-semibold text-center text-gray-800">Your Cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {items.map((item) => (
          <div key={item.dish._id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.dish.logo || defaultDishImage}
                alt={item.dish.name || 'Dish'}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-gray-800 truncate">{item.dish.name}</h3>
              <p className="text-xs text-gray-500"> ₹ {item.dish.price.toFixed(2)}</p>
              {item.dish.bestSeller && (
                <Badge variant="secondary" className="mt-1 text-xs bg-yellow-100 text-yellow-800">
                  Best Seller
                </Badge>
              )}
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.dish._id, -1)}
                  className="h-6 w-6"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.dish._id, 1)}
                  className="h-6 w-6"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeItem(item.dish._id)}
                className="h-6 text-xs px-2 py-0"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <label htmlFor="note" className="text-xs font-medium text-gray-600 mb-1 block">
            Special Instructions
          </label>
          <Input
            id="note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special requests?"
            className="text-sm"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch border-t border-gray-200 p-4">
        <div className="flex justify-between mb-3 text-sm font-semibold text-gray-800">
          <span>Total:</span>
          <span>₹ {totalAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium transition-colors duration-200"
          disabled={createOrderLoading}
        >
          {createOrderLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
          {createOrderLoading ? "Placing Order..." : "Place Order"}
        </Button>
      </CardFooter>
    </Card>
  );
}

