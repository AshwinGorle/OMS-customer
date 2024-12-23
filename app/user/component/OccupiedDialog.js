"use client";

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OccupiedStatus from "@/components/occupied/OccupiedStatus";
import ActionButtons from "@/components/occupied/ActionButtons";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WaitTimeInfo from "@/components/occupied/WaitTimeInfo";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

export default function OccupiedDialog({
  open,
  tableNumber,
  customerName,
}) {
  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>{`Table ${tableNumber} Status`}</DialogTitle>
        </DialogHeader>
      <DialogContent>
          <Card className="w-full max-w-md">
            <OccupiedStatus tableNumber={tableNumber} />
            <CardContent className="space-y-6">
              <Suspense fallback={<Spinner />}>
                <>
                  <WaitTimeInfo customerName={customerName} />
                  <ActionButtons
                    onRefresh={() => window.location.reload()}
                    isRefreshing={false}
                  />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Need assistance? Please ask our staff for help
                    </p>
                  </div>
                </>
              </Suspense>
            </CardContent>
          </Card>
      </DialogContent>
    </Dialog>
  );
}
