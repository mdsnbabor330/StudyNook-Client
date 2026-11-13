"use client";

import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoBookmarkOutline, IoBookmarks } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import BookingModal from "../modal/BookingModal";
import Image from "next/image";

const RoomDetailsCard = ({ room }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20 px-4">
        <p className="text-lg text-muted-foreground">
          Room details could not be found.
        </p>
        <Link
          href="/rooms"
          className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm"
        >
          Return to Rooms
        </Link>
      </div>
    );
  }

  const {
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
    bookingCount = 0,
  } = room;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Column: Media & Room Information */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Room Image */}
        <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-secondary border border-border shadow-sm">
          <Image
            src={image}
            alt={roomName || "Study Room"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        </div>

        {/* Room Header & Stats */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {roomName}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full border border-border">
              <FaMapMarkerAlt className="text-primary" />
              <span>{floor}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full border border-border">
              <MdOutlinePeopleAlt className="text-primary" />
              <span>Up to {capacity} People</span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full border border-border">
              <IoBookmarkOutline className="text-primary" />
              <span>{bookingCount} bookings</span>
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Room Description */}
        <div className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-foreground">
            About this space
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>

        <hr className="border-border" />

        {/* Amenities List */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Amenities & Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/60 border border-border/50 text-foreground text-sm font-medium"
              >
                <IoMdCheckmarkCircleOutline className="text-primary text-lg shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6 sticky top-24">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              ${hourlyRate}
            </span>
            <span className="text-sm text-muted-foreground">/ hour</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Free cancellation up to 24 hours in advance
          </p>
        </div>

        <hr className="border-border" />

        {/* Room Quick Specs */}
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Floor Level</span>
            <span className="font-semibold text-foreground">{floor}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Max Capacity</span>
            <span className="font-semibold text-foreground">
              {capacity} students
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Total Bookings</span>
            <span className="font-semibold text-foreground">
              {bookingCount} sessions
            </span>
          </div>
        </div>

        {/* Booking CTA or Login to Book */}
        {user ? (
          <BookingModal room={room} />
        ) : (
          <Link
            href="/signin"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 px-6 text-sm sm:text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-[0.99]"
          >
            <IoBookmarks />
            <span>Login to Book</span>
          </Link>
        )}

        <div className="p-3 bg-secondary rounded-xl text-xs sm:text-sm font-medium text-foreground flex items-center justify-center gap-2 border border-border">
          <IoMdCheckmarkCircleOutline className="text-primary text-base shrink-0" />
          <span>Instant confirmation — zero double-booking</span>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsCard;
