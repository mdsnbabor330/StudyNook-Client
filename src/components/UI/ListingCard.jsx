"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegEdit, FaExternalLinkAlt } from "react-icons/fa";
import DeleteRoom from "../modal/DeleteRoom";

const ListingCard = ({ listingRoom}) => {

  const {
    _id,
    roomId,
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = listingRoom;

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xs transition hover:shadow-lg">

      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-secondary">
        <Image
          src={image || "/placeholder.jpg"}
          alt={roomName || "Room image"}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

  
        <span className="absolute left-3.5 top-3.5 rounded-full bg-background/90 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-foreground shadow-xs border border-border">
          {typeof floor === "number" || /^\d+$/.test(String(floor))
            ? `Floor ${floor}`
            : floor || "Floor N/A"}
        </span>
      </div>


      <div className="p-5 sm:p-6 flex flex-1 flex-col justify-between">
        <div>

          <h2 className="mb-1.5 font-serif text-xl font-bold tracking-tight text-foreground line-clamp-1">
            {roomName}
          </h2>


          <p className="mb-4 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>


          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/60 p-2.5 text-xs text-muted-foreground">
            <p>
              Capacity:{" "}
              <span className="font-bold text-foreground">
                {capacity} people
              </span>
            </p>

            <p className="shrink-0">
              Rate:{" "}
              <span className="font-bold text-primary">${hourlyRate}/hr</span>
            </p>
          </div>

   
          <div className="mb-6 flex flex-wrap items-center gap-1.5">
            {amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
              >
                {amenity}
              </span>
            ))}

            {amenities.length > 3 && (
              <span className="rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                +{amenities.length - 3}
              </span>
            )}
          </div>
        </div>

      
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
          <Link
            href={`/rooms/${_id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background hover:bg-secondary px-2.5 py-2 text-xs font-semibold text-foreground transition-colors"
          >
            <FaExternalLinkAlt size={10} />
            <span>View</span>
          </Link>

          <Link
            href={`/edit-room/${_id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 px-2.5 py-2 text-xs font-semibold text-foreground transition-colors"
          >
            <FaRegEdit size={12} />
            <span>Edit</span>
          </Link>
          <DeleteRoom _id={_id} room={listingRoom} />

        </div>
      </div>
    </div>
  );
};

export default ListingCard;
