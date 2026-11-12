import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { FiBookOpen, FiBookmark, FiArrowRight } from "react-icons/fi";
import { connection } from "next/server";

export const instant = false;

export const metadata = {
  title: "StudyNook - User Profile",
  description:
    "View your StudyNook member details, listing stats, and activity.",
};

const ProfilePage = async () => {
  await connection();
  let user = null;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    user = session?.user;
  } catch (err) {
    console.error("Session error:", err);
  }

  let listingsCount = 0;
  let bookingsCount = 0;

  if (user?.id) {
    try {
      const roomsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/my-listing`);
      const bookingsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`);

      const rooms = await roomsRes.json();
      const bookings = await bookingsRes.json();

      listingsCount = rooms.filter((r) => r.userId === user.id).length;
      bookingsCount = bookings.filter((b) => b.userId === user.id).length;
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  }

  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Sign In to View Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          You must be logged in to view your profile dashboard.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 sm:pt-28 space-y-8">
      {/* Profile Header Banner */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-secondary border-2 border-border shrink-0 flex items-center justify-center shadow-xs">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User Avatar"}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <FaUserCircle size={70} className="text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {user.name}
            </h1>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary w-fit mx-auto sm:mx-0">
              <FaCheckCircle size={11} />
              <span>Verified Member</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {user.email}
          </p>

          <p className="text-xs text-muted-foreground pt-1">
            Student & Library Contributor on StudyNook
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Rooms Listed
            </p>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-1">
              {listingsCount}
            </p>
            <Link
              href="/my-listings"
              className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline mt-2"
            >
              <span>View Listings</span>
              <FiArrowRight size={12} />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
            <FiBookOpen />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Reservations
            </p>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-1">
              {bookingsCount}
            </p>
            <Link
              href="/my-bookings"
              className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline mt-2"
            >
              <span>View Bookings</span>
              <FiArrowRight size={12} />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
            <FiBookmark />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-foreground">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/rooms"
            className="p-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold text-sm">Browse Rooms</p>
              <p className="text-xs text-muted-foreground mt-1">
                Explore popular study spaces and reserved corners.
              </p>
            </div>
            <span className="text-xs text-primary font-bold mt-4 inline-flex items-center gap-1">
              Explore →
            </span>
          </Link>

          <Link
            href="/add-room"
            className="p-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold text-sm">List a Room</p>
              <p className="text-xs text-muted-foreground mt-1">
                Share an available room and earn hourly rates.
              </p>
            </div>
            <span className="text-xs text-primary font-bold mt-4 inline-flex items-center gap-1">
              Add New →
            </span>
          </Link>

          <Link
            href="/my-bookings"
            className="p-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold text-sm">My Bookings</p>
              <p className="text-xs text-muted-foreground mt-1">
                Review your schedule and active room passes.
              </p>
            </div>
            <span className="text-xs text-primary font-bold mt-4 inline-flex items-center gap-1">
              Manage →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
