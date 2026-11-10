import DeleteModal from "@/components/modal/DeleteModal";
import RoomDetailsCard from "@/components/UI/RoomDetailsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";
import { FaEdit } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";

const RoomDetails = async ({ params }) => {
  const { id } = await params;
  let room = [];
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      room = await res.json();
    }
  } catch (error) {
    console.error("Error fetching room:", error);
  }
  console.log("room", room.userId);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="border-b border-border bg-secondary/50 py-3.5 mb-6">
        <div className="max-w-300 mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-all"
          >
            <HiOutlineArrowLeft size={16} />
            <span>Back to All Rooms</span>
          </Link>

          {user.id === room?.userId && (
            <div className="flex items-center gap-2">
              <Link
                href={`/edit-room/${id}`}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-sky-500/20 text-sky-500 hover:bg-sky-400/10 hover:text-sky-600 text-xs font-semibold transition-colors cursor-pointer"
              >
                <FaEdit size={12} />
                <span>Edit Room</span>
              </Link>
              <DeleteModal _id={id} room={room} />
            </div>
          )}
        </div>
      </div>
      <RoomDetailsCard room={room} />
    </div>
  );
};

export default RoomDetails;
