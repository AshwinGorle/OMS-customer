"use client";

import { Table2 } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export default function OccupiedStatus() {
  return (
    <CardHeader className="text-center space-y-2">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
        <Table2 className="h-8 w-8 text-red-600" />
      </div>
      <CardTitle className="text-2xl font-bold">Table is Occupied</CardTitle>
    </CardHeader>
  );
}