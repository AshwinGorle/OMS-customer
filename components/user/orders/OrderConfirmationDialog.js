// "use client";

// import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { usePublishOrder } from "@/hooks/order/usePublishOrder";
// import { Spinner } from "@/components/ui/spinner";
// import { useDispatch, useSelector } from "react-redux";
// import { orderActions } from "@/redux/slices/orderSlice";
// import { DialogTitle } from "@radix-ui/react-dialog";

// export default function OrderConfirmationDialog(){
//   const dispatch = useDispatch();  
//   const {order , open} = useSelector((state)=>state.order.orderConfirmationDialog);
//   const {loading , handlePublishOrder} = usePublishOrder();
//   return (
//     <Dialog open={open} onOpenChange={()=>dispatch(orderActions.closeOrderConfirmationDialog())}>
//       <DialogHeader>
//         <DialogTitle>
//           Order Confirmation
//         </DialogTitle>
//       </DialogHeader>
//       <DialogContent className="max-w-sm mx-auto text-center p-6">
//          <div> Press Confirm to Confirm your order</div>
//          <Button onClick={()=>handlePublishOrder(order._id.toString())}>{loading ? <Spinner/> : "Confirm Order"}</Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

// --------------------- bhai new wala Confirm Order Dialog hai (purana wala commented hai )--------------------- 
"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePublishOrder } from "@/hooks/order/usePublishOrder";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function OrderConfirmationDialog() {
  const dispatch = useDispatch();
  const { order, open } = useSelector((state) => state.order.orderConfirmationDialog);
  const { loading, handlePublishOrder } = usePublishOrder();

  return (
    <Dialog
      open={open}
      onOpenChange={() => dispatch(orderActions.closeOrderConfirmationDialog())}
    >
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold mt-3">
          Confirm Your Order
        </DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-xs w-full mx-auto text-center p-4 space-y-4">
        <div className="text-sm text-gray-700">
          Are you sure you want to confirm this order?
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Button
            onClick={() => handlePublishOrder(order._id.toString())}
            className="w-24"
          >
            {loading ? <Spinner /> : "Confirm"}
          </Button>
          <Button
            variant="outline"
            onClick={() => dispatch(orderActions.closeOrderConfirmationDialog())}
            className="w-24"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
