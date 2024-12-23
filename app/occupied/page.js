"use client";

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OccupiedStatus from "@/components/occupied/OccupiedStatus";
import WaitTimeInfo from "@/components/occupied/WaitTimeInfo";
import ActionButtons from "@/components/occupied/ActionButtons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/config";
import { Spinner } from "@/components/ui/spinner";


export default function OccupiedPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
    const searchParams = useSearchParams();
    const tableId = searchParams.get("tableId")
    const hotelId = searchParams.get("hotelId")
    const tableNumber = searchParams.get("tableNumber")
    const customerName = searchParams.get("customerName")


  // yaha par refresh logic likh dena bhai , refresh karne table status show karna hai
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Here you would typically make an API call to check the table status
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo purposes, we'll just refresh the page
      // In a real app, you would check the table status and redirect accordingly
      window.location.reload();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Suspense fallback={<Spinner/>}>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <OccupiedStatus />
        <CardContent className="space-y-6">
          <WaitTimeInfo />
          <ActionButtons 
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
          <Button onClick={()=>router.push(`${baseUrl}/user/${hotelId}/${tableId}`)} variant="default">
             Go Back
          </Button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Need assistance? Please ask our staff for help
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </Suspense>
  );
}


// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { baseUrl } from "@/config";

//  const OccupiedPage = ()=>{
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const tableId = searchParams.get("tableId")
//     const hotelId = searchParams.get("hotelId")
//     const tableNumber = searchParams.get("tableNumber")
//     const customerName = searchParams.get("customerName")
   


//     return <div>
//         <div>{`table Number ${tableNumber} is busy`}</div>
//         <div>{`table Id : ${tableId}`}</div>
//         <div>{`hotel Id : ${hotelId}`}</div>
//         <button onClick={()=>router.push(`http://localhost:3000/user/${hotelId}/${tableId}`)}>refresh</button>
//     </div>

//  }
   
// export default OccupiedPage;