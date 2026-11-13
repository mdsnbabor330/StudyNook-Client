import Link from "next/link";
import React from "react";
import AnimatedCard from "../UI/AnimatedCard";

const ExploreRooms = async () => {
let rooms = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/explore-rooms`,
      {
        next: { revalidate: 10 },
      },
    );
    if (res.ok) {
      rooms = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
          OUR SELECTION
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          Explore Popular Rooms
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Discover our most popular study rooms designed to enhance your
          learning experience.
        </p>
      </div>

      {rooms && rooms.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {rooms.map((room) => (
            <AnimatedCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center max-w-md mx-auto bg-card border border-border shadow-sm p-8 rounded-2xl text-muted-foreground">
          <p>No rooms available at the moment.</p>
        </div>
      )}

      <div className="flex justify-between items-center gap-4 mt-12">
        <hr className="flex-1 border-border" />
        <Link
          href="/rooms"
          className="font-semibold text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
        >
          View All Rooms →
        </Link>
        <hr className="flex-1 border-border" />
      </div>
    </section>
  );
};

export default ExploreRooms;
