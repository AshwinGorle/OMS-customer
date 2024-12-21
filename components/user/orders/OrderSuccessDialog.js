"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2, Clock } from "lucide-react";

export default function OrderSuccessDialog({ open, onOpenChange }) {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto text-center p-6">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Order Placed Successfully!</h2>
            <p className="text-muted-foreground">
              Your order has been confirmed and will be ready soon.
            </p>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Estimated Time</span>
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatTime(timeLeft)}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            You can check your order status in the My Orders section
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}