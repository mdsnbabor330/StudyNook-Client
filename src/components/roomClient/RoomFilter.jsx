"use client";

import React, { useState } from "react";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";

const floors = [
  "All Floors",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "6th Floor",
];

const popularAmenities = [
  "All",
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
  "Natural Light",
  "Soundproof",
];

export default function RoomFilter({
  filters,
  onChange,
  onReset,
  totalResults,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (e) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleFloorChange = (e) => {
    onChange({
      ...filters,
      floor: e.target.value === "All Floors" ? "" : e.target.value,
    });
  };

  const handleAmenitySelect = (amenity) => {
    onChange({
      ...filters,
      amenity: amenity === "All" ? "" : amenity,
    });
  };

  const handleMaxRateChange = (e) => {
    onChange({ ...filters, maxRate: e.target.value });
  };

  const handleSortChange = (e) => {
    onChange({ ...filters, sort: e.target.value });
  };

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.floor ||
      filters.amenity ||
      (filters.maxRate && Number(filters.maxRate) < 50) ||
      filters.sort !== "newest"
  );

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      {/* Top Search & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-lg pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search rooms by name (e.g. Quiet Haven, Studio A)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: "" })}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

  
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <select
            value={filters.floor ? filters.floor : "All Floors"}
            onChange={handleFloorChange}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>

          <select
            value={filters.sort || "newest"}
            onChange={handleSortChange}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="capacity">Highest Capacity</option>
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0 ${
              showAdvanced || filters.maxRate < 50
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            <FiSliders size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-2.5 py-2 text-xs font-semibold text-destructive hover:underline cursor-pointer shrink-0"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="pt-1">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          Filter by Amenity:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {popularAmenities.map((amenity) => {
            const isSelected =
              amenity === "All"
                ? !filters.amenity
                : filters.amenity === amenity;
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenitySelect(amenity)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary text-foreground border border-border hover:bg-secondary/80"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      {showAdvanced && (
        <div className="pt-3 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mb-1.5">
              <span>Max Hourly Rate:</span>
              <span className="font-bold text-foreground">
                ${filters.maxRate || 50}/hr
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={filters.maxRate || 50}
              onChange={handleMaxRateChange}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>$5/hr</span>
              <span>$50/hr</span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground">{totalResults}</strong>{" "}
              {totalResults === 1 ? "room" : "rooms"}
            </span>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
