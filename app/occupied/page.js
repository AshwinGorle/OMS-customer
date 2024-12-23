"use client";

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OccupiedStatus from "@/components/occupied/OccupiedStatus";
import WaitTimeInfo from "@/components/occupied/WaitTimeInfo";
import ActionButtons from "@/components/occupied/ActionButtons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/config";
import { Spinner } from "@/components/ui/spinner";

const OccupiedContent = () => {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableId");
  const hotelId = searchParams.get("hotelId");
  const tableNumber = searchParams.get("tableNumber");
  const customerName = searchParams.get("customerName");

  const router = useRouter();

  return (
    <>
      <WaitTimeInfo />
      <ActionButtons onRefresh={() => window.location.reload()} isRefreshing={false} />
      <Button onClick={() => router.push(`${baseUrl}/user/${hotelId}/${tableId}`)} variant="default">
        Go Back
      </Button>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Need assistance? Please ask our staff for help
        </p>
      </div>
    </>
  );
};

export default function OccupiedPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <OccupiedStatus />
          <CardContent className="space-y-6">
            <Suspense fallback={<Spinner />}>
              <OccupiedContent />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
