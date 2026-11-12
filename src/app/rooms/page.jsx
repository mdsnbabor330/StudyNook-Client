import RoomsClient from "@/components/roomClient/RoomsClient";
import { connection } from "next/server";


export const instant = false;

export const metadata = {
  title: "StudyNook - Available Rooms",
  description:
    "Browse, filter, and reserve private university study rooms with instant booking and zero double-booking.",
};

const Rooms=async () => {
  await connection();
  let initialRooms = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
      cache: "no-store", 
    });

    if (response.ok) {
      initialRooms = await response.json();
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
          OUR COLLECTION
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          Explore Available Rooms
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Discover quiet, well-equipped study rooms designed to elevate your focus and academic collaboration.
        </p>
      </div>

      <RoomsClient initialRooms={initialRooms} />
    </main>
  );
}

export default Rooms;