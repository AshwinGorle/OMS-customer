// "use client"

// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Badge } from "@/components/ui/badge"
// import { OrderCard } from './OrderCards'
// import { ChevronDown, ChevronUp, ClipboardList, Clock, CheckCircle } from 'lucide-react'

// const statusIcons = {
//   draft: ClipboardList,
//   pending: Clock,
//   preparing: Clock,
//   completed: CheckCircle
// }

// const StatusSection = ({ title, orders, icon: Icon }) => {
//   const [isExpanded, setIsExpanded] = useState(true)

//   return (
//     <Card className="mb-4 mt-4">
//       <CardHeader className="py-4 px-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Icon className="w-5 h-5" />
//             <CardTitle className="text-lg">{title}</CardTitle>
//             <Badge variant="default" className="ml-2">
//               {orders.length}
//             </Badge>
//           </div>
//           <button onClick={() => setIsExpanded(!isExpanded)}>
//             {isExpanded ? <ChevronUp /> : <ChevronDown />}
//           </button>
//         </div>
//       </CardHeader>
//       {isExpanded && (
//         <CardContent className="pt-0">
//             {orders.map(order => (
//               <div key={order._id} className="mb-4">
//                 <OrderCard order={order} />
//               </div>
//             ))}

//         </CardContent>
//       )}
//     </Card>
//   )
// }

// export function OrderList({ orders }) {
//   const categorizedOrders = {
//     draft: orders.filter(order => order.status === 'draft'),
//     pending: orders.filter(order => order.status === 'pending'),
//     preparing: orders.filter(order => order.status === 'preparing'),
//     completed: orders.filter(order => order.status === 'completed')
//   }

//   return (
//     <div className="space-y-4">
//       {Object.entries(categorizedOrders).map(([status, statusOrders]) => (
//         statusOrders.length > 0 && (
//           <StatusSection
//             key={status}
//             title={status.charAt(0).toUpperCase() + status.slice(1)}
//             orders={statusOrders}
//             icon={statusIcons[status]}
//           />
//         )
//       ))}
//     </div>
//   )
// }

// this is the new code for : STATUS CARDS FOR DIFFERENT DISHES : developed by CHIRAG PATIL
// purana code commented hai , kuch dikkat aai toh uncomment kr lena
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { OrderCard } from "./OrderCards";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  CheckCircle,
  ClockArrowDownIcon,
} from "lucide-react";
import { Button } from "../ui/button";

const statusIcons = {
  draft: ClipboardList,
  pending: ClockArrowDownIcon,
  preparing: Clock,
  completed: CheckCircle,
};

const statusColors = {
  draft: "bg-background",
  pending: "bg-yellow-50 dark:bg-yellow-900",
  preparing: "bg-blue-50 dark:bg-blue-900",
  completed: "bg-green-50 dark:bg-green-900",
};

const StatusSection = ({ status, title, orders, icon: Icon, color }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const contentHeight = useMemo(() => {
    if (orders.length <= 3) {
      return `h-[${orders.length * 100}px]`;
    }
    return "h-[300px]";
  }, [orders.length]);

  return (
    <Card
      className={`h-full ${color} border-l-4 ${
        color === "bg-background"
          ? "border-l-gray-300"
          : color.includes("yellow")
          ? "border-l-yellow-500"
          : color.includes("blue")
          ? "border-l-blue-500"
          : "border-l-green-500"
      }`}
    >
      <CardHeader className="py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              className={`w-5 h-5 ${
                color === "bg-background"
                  ? "text-gray-500"
                  : color.includes("yellow")
                  ? "text-yellow-600"
                  : color.includes("blue")
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            />
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="secondary" className="ml-2">
              {orders.length}
            </Badge>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <ScrollArea className={`${contentHeight} pr-4`}>
            {orders.map((order) => (
              <div key={order._id} className="mb-4 last:mb-0">
                <OrderCard order={order} status={status} />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      )}
    </Card>
  );
};

export function OrderList({ orders }) {
  const categorizedOrders = {
    draft: orders.filter((order) => order.status === "draft"),
    pending: orders.filter((order) => order.status === "pending"),
    preparing: orders.filter((order) => order.status === "preparing"),
    completed: orders.filter((order) => order.status === "completed"),
  };

  return (
    <div className="space-y-4 w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
      {Object.entries(categorizedOrders).map(([status, statusOrders]) => {
        return (
          statusOrders.length <= 0 ? "" : (
            <StatusSection
              key={status}
              status={status}
              title={status.charAt(0).toUpperCase() + status.slice(1)}
              orders={statusOrders}
              icon={statusIcons[status]}
              color={statusColors[status]}
            />
          )
        );
      })}
    </div>
  );
}
