"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/price";

export default function DishCard({ dish, onAddClick }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-20 sm:h-28 w-full">
        <Image
          src={dish.logo}
          alt={dish.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-2">
        <div className="space-y-0.5">
          <h3 className="font-semibold truncate text-xs sm:text-sm">{dish.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {dish.description}
          </p>
          <div className="flex items-center justify-between pt-0.5">
            <span className="font-semibold text-primary text-xs">
              {formatPrice(dish.price)}
            </span>
            <Button size="sm" onClick={onAddClick} className="h-6 text-xs px-2">
              <Plus className="h-3 w-3 mr-0.5" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}