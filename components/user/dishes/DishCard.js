"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/price";

export default function DishCard({ dish, onAddClick }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-36 sm:h-32 w-full">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-3">
        <div className="space-y-1">
          <h3 className="font-semibold truncate text-base sm:text-lg">{dish.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {dish.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-primary text-sm sm:text-base">
              {formatPrice(dish.price)}
            </span>
            <Button size="sm" onClick={onAddClick} className="text-xs sm:text-sm px-2 sm:px-3">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}