"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { OrderCard } from './orderCards'
import { ChevronDown, ChevronUp, ClipboardList, Clock, CheckCircle } from 'lucide-react'

const statusIcons = {
  draft: ClipboardList,
  pending: Clock,
  preparing: Clock,
  completed: CheckCircle
}

const StatusSection = ({ title, orders, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card className="mb-4">
      <CardHeader className="py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="default" className="ml-2">
              {orders.length}
            </Badge>
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
            {orders.map(order => (
              <div key={order._id} className="mb-4">
                <OrderCard order={order} />
              </div>
            ))}
        
        </CardContent>
      )}
    </Card>
  )
}

export function OrderList({ orders }) {
  const categorizedOrders = {
    draft: orders.filter(order => order.status === 'draft'),
    pending: orders.filter(order => order.status === 'pending'),
    preparing: orders.filter(order => order.status === 'preparing'),
    completed: orders.filter(order => order.status === 'completed')
  }

  return (
    <div className="space-y-4">
      {Object.entries(categorizedOrders).map(([status, statusOrders]) => (
        statusOrders.length > 0 && (
          <StatusSection 
            key={status}
            title={status.charAt(0).toUpperCase() + status.slice(1)}
            orders={statusOrders}
            icon={statusIcons[status]}
          />
        )
      ))}
    </div>
  )
}

