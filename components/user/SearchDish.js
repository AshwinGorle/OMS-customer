"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchDish({ onSearch, searchQuery}) {

  return (
    <form className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for dishes..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </form>
  );
}