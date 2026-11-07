import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName = "Study Space",
    description = "",
    floor = "1st",
    capacity = 1,
    hourlyRate = 0,
    amenities = [],
    image = "/placeholder.jpg",
  } = room || {};

  const visibleAmenities = amenities.slice(0, 3);
  const remainingAmenities = amenities.length - 3;

  const shortDescription =
    description.length > 90 ? description.slice(0, 90) + "..." : description;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Room Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={roomName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 line-clamp-1 font-serif text-xl font-bold text-foreground">
          {roomName}
        </h3>

        <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {shortDescription || "Comfortable and quiet study environment."}
        </p>

        {/* Info Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="rounded-xl bg-secondary/70 p-3 border border-border/50">
            <p className="text-[11px] font-medium text-muted-foreground">
              Floor
            </p>
            <p className="font-semibold text-foreground">{floor}</p>
          </div>

          <div className="rounded-xl bg-secondary/70 p-3 border border-border/50">
            <p className="text-[11px] font-medium text-muted-foreground">
              Capacity
            </p>
            <p className="font-semibold text-foreground">{capacity} people</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">${hourlyRate}</span>
          <span className="text-xs text-muted-foreground">/ hr</span>
        </div>

        {/* Amenities */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {visibleAmenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {amenity}
            </span>
          ))}

          {remainingAmenities > 0 && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              +{remainingAmenities} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/rooms/${_id}`}
          className="mt-auto w-full rounded-xl bg-primary px-4 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary/90 text-xs sm:text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
