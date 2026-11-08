import RoomDetailsCard from "@/components/UI/RoomDetailsCard";
import Link from "next/link";
import React, { Suspense } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const RoomDetails = async ({ params }) => {
  const { id } = await params;
  let room = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,{
        cache: "no-store",
    });
    if (res.ok) {
      room = await res.json();
    }
  } catch (error) {
    console.error("Error fetching room:", error);
  }
  console.log("room",room);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="border-b border-border bg-secondary/50 py-3.5 mb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-all"
          >
            <HiOutlineArrowLeft size={16} />
            <span>Back to All Rooms</span>
          </Link>
        </div>
      </div>
      <RoomDetailsCard room={room} />
    </div>
  );
};

export default RoomDetails;