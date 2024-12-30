"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { formatPrice } from "@/lib/utils/price";
import { Badge } from "@/components/ui/badge";

export default function MenuItem({ item }) {
  return (
    <div className="p-4 flex gap-4 hover:bg-gray-50/80 transition-colors group">
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={item.logo}
          alt={item.name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {item.bestSeller && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" className="bg-yellow-500/90 hover:bg-yellow-500/95">
              <Award className="h-3 w-3 mr-1" />
              Bestseller
            </Badge>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          <span className="flex-shrink-0 font-semibold text-primary">
            {formatPrice(item.price || 0)}
          </span>
        </div>
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.ingredients.map((ing, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100/80"
              >
                {ing.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}