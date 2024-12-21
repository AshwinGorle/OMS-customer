"use client";

import Image from "next/image";

export default function CarouselSlide({ offer }) {
  return (
    <div className="w-full h-full flex-shrink-0 relative">
      <Image
        src={offer.image}
        alt={offer.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
        <h3 className="text-xl font-bold">{offer.name}</h3>
        <p className="text-sm opacity-90">{offer.description}</p>
      </div>
    </div>
  );
}