import ListingCard from "@/components/UI/ListingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connection } from "next/server";
import Link from "next/link";
import React from "react";
import { FiPlus, FiFolder } from "react-icons/fi";

export const metadata = {
  title: "StudyNook - My Listings",
  description: "Manage your listed study rooms and track booking activity.",
};

const MyListings = async () => {
  await connection();
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(tokenData);
  let user = [];
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    user = session?.user;
  } catch (err) {
    console.error("Session fetch error:", err);
  }

  const { id } = user || {};

  let listingRooms = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/my-listing`,
      {
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      },
    );
    if (res.ok) {
      listingRooms = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch listings:", err);
  }

  const myListings = Array.isArray(listingRooms)
    ? listingRooms.filter((room) => room.userId === id)
    : [];

  if (!user) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20 pt-28 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-secondary text-primary mx-auto flex items-center justify-center text-2xl">
          <FiFolder />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Sign In to View Listings
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Please log in to your StudyNook account to manage and view your room
            listings.
          </p>
        </div>
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 sm:pt-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
            OWNER DASHBOARD
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-1">
            My Room Listings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your {myListings.length}{" "}
            {myListings.length === 1 ? "listing" : "listings"} and track
            bookings.
          </p>
        </div>

        <Link
          href="/add-room"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <FiPlus size={16} />
          <span>Add New Room</span>
        </Link>
      </div>

      {/* Listings Grid */}
      {myListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {myListings.map((listingRoom) => (
            <ListingCard key={listingRoom._id} listingRoom={listingRoom} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border shadow-sm p-8 sm:p-12 rounded-2xl flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary text-2xl">
            <FiFolder />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              You haven&apos;t listed any rooms yet
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              List your library room or study corner to share with fellow
              students and earn.
            </p>
          </div>
          <Link
            href="/add-room"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            <span>Create Your First Listing</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyListings;
