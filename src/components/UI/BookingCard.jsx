import CancelBooking from "@/components/modal/CancelBooking";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import DeleteBooking from "../modal/DeleteBooking";

const BookingCard = ({ bookingRoom }) => {
  const {
    _id,
    date,
    startTime,
    endTime,
    image,
    roomName,
    totalCost,
    message,
    roomId,
    status = "Confirmed",
  } = bookingRoom;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date unavailable";

  const bookingDate = date ? new Date(date) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFutureOrToday = bookingDate ? bookingDate >= today : false;

  const isConfirmed = status?.toLowerCase() === "confirmed";
  const isCancelled = status?.toLowerCase() === "cancelled";
  const canCancel = isConfirmed && isFutureOrToday;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm transition hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 flex-1">
        <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-secondary border border-border shrink-0">
          <Image
            src={image || "/placeholder.jpg"}
            alt={roomName || "Booked Room"}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/rooms/${roomId || _id}`}
              className="text-lg sm:text-xl font-serif font-bold text-foreground hover:text-primary transition-colors truncate"
            >
              {roomName}
            </Link>

            {isConfirmed && (
              <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                <IoMdCheckmarkCircleOutline size={14} />
                <span>Confirmed</span>
              </span>
            )}

            {isCancelled && (
              <span className="inline-flex items-center gap-1 text-red-600 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                <MdOutlineCancel size={14} />
                <span>Cancelled</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-lg border border-border">
              <FaRegCalendarAlt className="text-primary" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-lg border border-border">
              <FaClock className="text-primary" />
              <span>
                {startTime} - {endTime}
              </span>
            </div>

            <span className="font-bold text-foreground text-sm">
              ${Number(totalCost || 0).toFixed(2)}
            </span>
          </div>

          {message && (
            <p className="text-xs text-muted-foreground italic line-clamp-1 bg-secondary/50 px-2.5 py-1 rounded-lg border border-border/40">
              Note: &ldquo;{message}&rdquo;
            </p>
          )}
        </div>
      </div>

      {canCancel && (
        <div className="shrink-0 self-end md:self-center">
          <CancelBooking bookingRoom={bookingRoom} />
          
        </div>
      )}
      <DeleteBooking _id={_id} bookingRoom={bookingRoom} />
    </div>
  );
};

export default BookingCard;
