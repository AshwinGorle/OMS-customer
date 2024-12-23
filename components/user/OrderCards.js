// "use client"

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ShoppingCart, Utensils, DollarSign, ClipboardList, IndianRupee } from 'lucide-react'

// export function OrderCard({ order }) {
//   const calculateTotal = () => {
//     return order.dishes.reduce((total, dish) => {
//       return total + (dish.dishId.price * dish.quantity);
//     }, 0);
//   };

//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <CardHeader className="pb-1">
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-lg flex items-center gap-2">
//             <ShoppingCart className="w-5 h-5" />
//             Order #{order._id.slice(-6)}
//           </CardTitle>
//           <Badge variant={order.status === 'draft' ? 'secondary' : 'default'} className="flex items-center gap-1">
//             <ClipboardList className="w-4 h-4" />
//             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="pt-1">
//         <ul className="space-y-1">
//           {order.dishes.map((dish) => (
//             <li key={dish._id} className="flex justify-between items-center text-sm m-0 p-0">
//               <span className="flex items-center gap-2">
//                 <Utensils className="w-4 h-4 text-muted-foreground" />
//                 {dish.dishId.name} x{dish.quantity}
//               </span>
//               <span>${(dish.dishId.price * dish.quantity).toFixed(2)}</span>
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center pt-0 font-semibold">
//         <span className="flex items-center gap-1">
//           <IndianRupee className="w-3 h-3" />
//           Total
//         </span>
//         <span>${calculateTotal().toFixed(2)}</span>
//       </CardFooter>
//     </Card>
//   )
// }

"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Utensils, DollarSign, ClipboardList, IndianRupee } from 'lucide-react'

export function OrderCard({ order }) {
  const calculateTotal = () => {
    return order.dishes.reduce((total, dish) => {
      return total + (dish.dishId.price * dish.quantity);
    }, 0);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="pt-2 pb-2">
        <ul className="space-y-1">
          {order.dishes.map((dish) => (
            <li key={dish._id} className="flex justify-between items-center text-sm m-0 p-0">
              <span className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-muted-foreground" />
                {dish.dishId.name} x{dish.quantity}
              </span>
              <span>${(dish.dishId.price * dish.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>

    </Card>
  )
}

