"use client";

import React, { useState, useMemo } from "react";
import RoomFilter from "./RoomFilter";
import AnimatedCard from "../UI/AnimatedCard";

export default function RoomsClient({ initialRooms = [] }) {
  const [filters, setFilters] = useState({
    search: "",
    floor: "",
    amenity: "",
    maxRate: 50,
    sort: "newest",
  });

  const handleReset = () => {
    setFilters({
      search: "",
      floor: "",
      amenity: "",
      maxRate: 50,
      sort: "newest",
    });
  };

  // Filter and sort rooms in real-time
  const filteredRooms = useMemo(() => {
    return initialRooms.filter((room) => {
      // Search by room name
      if (
        filters.search &&
        !room.roomName
          ?.toLowerCase()
          .includes(filters.search.trim().toLowerCase())
      ) {
        return false;
      }

      // Filter by floor
      if (filters.floor && filters.floor !== "All Floors") {
        const roomFloor = String(room.floor || "").toLowerCase();
        const targetFloor = String(filters.floor).toLowerCase();
        if (!roomFloor.includes(targetFloor) && !targetFloor.includes(roomFloor)) {
          return false;
        }
      }

      // Filter by amenity
      if (filters.amenity && filters.amenity !== "All") {
        if (
          !Array.isArray(room.amenities) ||
          !room.amenities.some(
            (a) => a.toLowerCase() === filters.amenity.toLowerCase()
          )
        ) {
          return false;
        }
      }

      // Filter by max rate
      if (
        filters.maxRate &&
        Number(room.hourlyRate || 0) > Number(filters.maxRate)
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sort === "price-low") {
        return Number(a.hourlyRate || 0) - Number(b.hourlyRate || 0);
      }
      if (filters.sort === "price-high") {
        return Number(b.hourlyRate || 0) - Number(a.hourlyRate || 0);
      }
      if (filters.sort === "capacity") {
        return Number(b.capacity || 0) - Number(a.capacity || 0);
      }
      // default: newest
      return (b._id || "").localeCompare(a._id || "");
    });
  }, [initialRooms, filters]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Component */}
      <RoomFilter
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        totalResults={filteredRooms.length}
      />

      {/* Rooms Grid */}
      <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <AnimatedCard key={room._id} room={room}/>
          ))
        ) : (
          <div className="col-span-full mx-auto max-w-280 rounded-2xl border border-border bg-card p-8 sm:p-10 text-center shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-secondary text-muted-foreground mx-auto flex items-center justify-center text-xl">
              🔍
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground">
                No Study Rooms Found
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                We couldn&apos;t find any rooms matching your current filter criteria.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
