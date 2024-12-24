"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselSlide from "./carousel/CarouselSlide";
import CarouselControls from "./carousel/CarouselControls";
import CarouselIndicators from "./carousel/CarouselIndicators";
import useCarousel from "@/hooks/useCarousel";

export default function OffersCarousel({ offers }) {
  const { currentSlide, nextSlide, prevSlide, setCurrentSlide } = useCarousel(offers.length);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg">
      <div className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {offers.map((offer) => (
          <CarouselSlide key={offer._id} offer={offer} />
        ))}
      </div>  

      <CarouselControls onPrev={prevSlide} onNext={nextSlide} />
      <CarouselIndicators
        total={offers.length}
        current={currentSlide}
        onChange={setCurrentSlide}
      />
    </div>
  );
}