// "use client";

// import Image from "next/image";
// import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { formatPrice } from "@/lib/utils/price";

// export default function DishCard({ dish, onAddClick }) {

//   // dish object 
//   console.log(dish);


//   return (
//     <Card className="overflow-hidden h-full">
//       <div className="relative h-20 sm:h-28 w-full">
//         <Image
//           src={dish.logo}
//           alt={dish.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <CardContent className="p-2">
//         <div className="space-y-0.5">
//           <h3 className="font-semibold truncate text-xs sm:text-sm">{dish.name}</h3>
//           <p className="text-xs text-muted-foreground line-clamp-1">
//             {dish.description}
//           </p>
//           <div className="flex items-center justify-between pt-0.5">
//             <span className="font-semibold text-primary text-xs">
//               {formatPrice(dish.price)}
//             </span>
//             <Button size="sm" onClick={onAddClick} className="h-6 text-xs px-2">
//               <Plus className="h-3 w-3 mr-0.5" />
//               Add
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }





// "use client";

// import Image from "next/image";
// import { Plus, Award, XCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { formatPrice } from "@/lib/utils/price";

// export default function DishCard({ dish, onAddClick }) {
//   console.log(dish)

//   const ingredientsList = dish.ingredients
//     .map(ing => ing.name)
//     .join(", ");

//   return (
//     <Card className="overflow-hidden h-full hover:shadow-lg transition-all">
//       <div className="relative">
//         <div className="relative aspect-square sm:aspect-[4/3]">
//           <Image
//             src={dish.logo}
//             alt={dish.name}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//           {dish.outOfStock && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//               <Badge variant="destructive" className="text-sm">
//                 <XCircle className="h-4 w-4 mr-1" />
//                 Out of Stock
//               </Badge>
//             </div>
//           )}
//         </div>
        
//         {/* Tags */}
//         <div className="absolute top-2 left-2 flex flex-col gap-2">
//           {dish.bestSeller && (
//             <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
//               <Award className="h-3 w-3 mr-1" />
//               Bestseller
//             </Badge>
//           )}
//           {dish.offer && (
//             <Badge variant="default" className="bg-green-500 hover:bg-green-600">
//               {dish.offer.description}
//             </Badge>
//           )}
//         </div>
//       </div>

//       <CardContent className="p-3 space-y-2">
//         <div className="space-y-1">
//           <h3 className="font-semibold text-base sm:text-lg leading-tight">
//             {dish.name}
//           </h3>
          
//           <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
//             {dish.description}
//           </p>
          
//           <div className="text-xs text-muted-foreground">
//             Ingredients: {ingredientsList.length > 30 
//               ? `${ingredientsList.substring(0, 30)}...` 
//               : ingredientsList}
//           </div>
//         </div>

//         <div className="flex items-center justify-between pt-2">
//           <span className="font-semibold text-primary text-sm sm:text-base">
//             {formatPrice(dish.price)}
//           </span>
//           <Button 
//             size="sm" 
//             onClick={onAddClick}
//             disabled={dish.outOfStock}
//             className="text-xs sm:text-sm px-2 sm:px-3"
//           >
//             <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//             {dish.outOfStock ? "Out of Stock" : "Add"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }






"use client";

import Image from "next/image";
import { Plus, Award, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils/price";
import { defaultDishImage } from "@/config";

export default function DishCard({ dish, onAddClick }) {
  const ingredientsList = dish.ingredients
    .map(ing => ing.name)
    .join(", ");

  return (
    <Card className="overflow-hidden h-full hover:shadow-lg transition-all">
      <div className="relative">
        <div className="relative w-full h-40 sm:h-48">
          <Image
            src={dish.logo || defaultDishImage}
            alt={dish.name || 'sorry'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {dish.outOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">
                <XCircle className="h-4 w-4 mr-1" />
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {dish.bestSeller && (
            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
              <Award className="h-3 w-3 mr-1" />
              Bestseller
            </Badge>
          )}
          {dish.offer && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              {dish.offer.description}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-base sm:text-lg leading-tight">
            {dish.name}
          </h3>
          
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {dish.description}
          </p>
          
          <div className="text-xs text-muted-foreground">
            Ingredients: {ingredientsList.length > 30 
              ? `${ingredientsList.substring(0, 30)}...` 
              : ingredientsList}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-primary text-sm sm:text-base">
            {formatPrice(dish.price)}
          </span>
          <Button 
            size="sm" 
            onClick={onAddClick}
            disabled={dish.outOfStock}
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {dish.outOfStock ? "Out of Stock" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}