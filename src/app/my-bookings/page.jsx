import { auth } from "@/lib/auth";
import BookingCard from "@/components/UI/BookingCard";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { IoBookmarksOutline } from "react-icons/io5";

export const metadata = {
  title: "StudyNook - My Bookings",
  description: "View and manage your active and past study room reservations.",
};

const MyBookings = async () => {
  let user = null;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    user = session?.user;
  } catch (err) {
    console.error("Session fetch error:", err);
  }

  const { id } = user || {};

  let myBookings = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const allBookings = await res.json();
      myBookings = Array.isArray(allBookings)
        ? allBookings.filter((b) => b.userId === id)
        : [];
    }
  } catch (err) {
    console.error("Error fetching bookings:", err);
  }

  if (!user) {
    return (
      <div className="w-full max-w-300 mx-auto px-4 py-20 pt-28 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-secondary text-primary mx-auto flex items-center justify-center text-2xl">
          <IoBookmarksOutline />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Sign In to View Bookings
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Please log in to your StudyNook account to see your booked slots and
            session history.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 sm:pt-28">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
          MEMBER DASHBOARD
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-1">
          My Bookings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          You have {myBookings.length}{" "}
          {myBookings.length === 1 ? "reservation" : "reservations"}.
        </p>
      </div>

      {myBookings.length > 0 ? (
        <div className="space-y-4">
          {myBookings.map((bookingRoom) => (
            <BookingCard key={bookingRoom._id} bookingRoom={bookingRoom} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border shadow-sm p-8 sm:p-12 rounded-2xl flex flex-col items-center justify-center text-center max-w-300 mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary text-2xl">
            <IoBookmarksOutline />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              You have no bookings yet
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Find quiet reading spaces, private carrels, or group studios to
              start booking.
            </p>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            Browse Available Rooms
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
