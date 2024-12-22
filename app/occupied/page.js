"use client";
import { useRouter, useSearchParams } from "next/navigation";

 const OccupiedPage = ()=>{
    const router = useRouter();
    const searchParams = useSearchParams();
    const tableId = searchParams.get("tableId")
    const hotelId = searchParams.get("hotelId")
    const tableNumber = searchParams.get("tableNumber")
    const customerName = searchParams.get("customerName")
   


    return <div>
        <div>{`table Number ${tableNumber} is busy`}</div>
        <div>{`table Id : ${tableId}`}</div>
        <div>{`hotel Id : ${hotelId}`}</div>
        <button onClick={()=>router.push(`http://localhost:3000/user/${hotelId}/${tableId}`)}>refresh</button>
    </div>

 }
   
export default OccupiedPage;