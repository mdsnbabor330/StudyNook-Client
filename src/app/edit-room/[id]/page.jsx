"use client";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";

import { HiOutlineArrowLeft } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const floors = [
  { id: "Ground Floor", name: "Ground Floor" },
  { id: "1st Floor", name: "1st Floor" },
  { id: "2nd Floor", name: "2nd Floor" },
  { id: "3rd Floor", name: "3rd Floor" },
  { id: "4th Floor", name: "4th Floor" },
  { id: "5th Floor", name: "5th Floor" },
  { id: "6th Floor", name: "6th Floor" },
  { id: "Basement", name: "Basement" },
];

const amenitiesList = [
  "Wi-Fi",
  "Locker",
  "Projector",
  "Power Outlets",
  "Natural Light",
  "Soundproof",
  "Standing Desk",
  "Coffee Machine",
  "Whiteboard",
  "Air Conditioning",
];

export default function EditRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState("1st Floor");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    document.title = "StudyNook - Edit Study Room";
  }, []);

  useEffect(() => {
    if (!roomId) return;
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`,
        );

        if (!res.ok) throw new Error("Could not load room details");

        const data = await res.json();
        setRoom(data);
        setSelectedFloor(data.floor || "1st Floor");
        setSelectedAmenities(data.amenities || []);
      } catch (err) {
        toast.error("Failed to load room details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!room) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif text-foreground">
          Room Not Found
        </h2>
        <Link
          href="/my-listings"
          className="text-primary hover:underline text-sm font-semibold"
        >
          ← Back to My Listings
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { data: tokenData } = await authClient.token();

    const updatedRoomData = {
      roomName: formData.get("roomName")?.toString().trim(),
      description: formData.get("description")?.toString().trim(),
      image: formData.get("image")?.toString().trim(),
      floor: selectedFloor || formData.get("floor") || "1st Floor",
      capacity: Number(formData.get("capacity")) || 1,
      hourlyRate: Number(formData.get("hourlyRate")) || 0,
      amenities: selectedAmenities,
    };

    try {
      setIsSaving(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(updatedRoomData),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update room");
      }

      toast.success("Room updated successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to update room");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 pt-24 sm:pt-28">
      <Link
        href="/my-listings"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <HiOutlineArrowLeft size={16} />
        <span>Back to My Listings</span>
      </Link>

      <div className="mb-6">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase mb-1">
          EDIT LISTING
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Update Study Room
        </h1>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-card border border-border shadow-xl rounded-2xl p-6 sm:p-8"
        render={(props) => <form {...props} />}
      >
        <TextField
          isRequired
          name="roomName"
          defaultValue={room.roomName || ""}
          validate={(value) => {
            if (!value || value.trim().length < 3) {
              return "Room name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label className="text-xs sm:text-sm font-medium text-foreground">
            Room Name
          </Label>
          <Input
            className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter room name"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        <TextField
          isRequired
          name="description"
          defaultValue={room.description || ""}
          validate={(value) => {
            if (!value || value.trim().length < 10) {
              return "Description must be at least 10 characters";
            }
            return null;
          }}
        >
          <Label className="text-xs sm:text-sm font-medium text-foreground">
            Description
          </Label>
          <TextArea
            className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-25"
            placeholder="Enter room description"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        <TextField
          isRequired
          name="image"
          type="url"
          defaultValue={room.image || ""}
          validate={(value) => {
            if (!value || !/^https?:\/\/.+/i.test(value)) {
              return "Please enter a valid image URL (starting with http:// or https://)";
            }
            return null;
          }}
        >
          <Label className="text-xs sm:text-sm font-medium text-foreground">
            Image URL
          </Label>
          <Input
            className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com/image.jpg"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-floor-select"
              className="text-xs sm:text-sm font-medium text-foreground"
            >
              Floor
            </label>
            <div className="relative">
              <select
                id="edit-floor-select"
                name="floor"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                required
                className="w-full h-11.5 appearance-none rounded-xl border border-border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer shadow-xs"
              >
                {floors.map((floor) => (
                  <option
                    key={floor.id}
                    value={floor.id}
                    className="bg-card text-foreground py-2"
                  >
                    {floor.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-muted-foreground">
                <IoIosArrowDown size={15} />
              </div>
            </div>
          </div>

          <TextField
            isRequired
            name="capacity"
            type="number"
            defaultValue={String(room.capacity || 1)}
            validate={(value) => {
              const num = Number(value);
              if (isNaN(num) || num <= 0) {
                return "Capacity must be greater than 0";
              }
              return null;
            }}
          >
            <Label className="text-xs sm:text-sm font-medium text-foreground">
              Capacity
            </Label>
            <Input
              type="number"
              placeholder="2"
              className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="hourlyRate"
            type="number"
            defaultValue={String(room.hourlyRate || 0)}
            validate={(value) => {
              const num = Number(value);
              if (isNaN(num) || num <= 0) {
                return "Hourly rate must be greater than 0";
              }
              return null;
            }}
          >
            <Label className="text-xs sm:text-sm font-medium text-foreground">
              Hourly Rate ($)
            </Label>
            <Input
              type="number"
              placeholder="10"
              className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>
        </div>

        <div>
          <Label className="text-xs sm:text-sm font-medium text-foreground mb-3 block">
            Amenities & Features
          </Label>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => {
                    setSelectedAmenities((prev) =>
                      prev.includes(amenity)
                        ? prev.filter((a) => a !== amenity)
                        : [...prev, amenity],
                    );
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isChecked
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

        <button
          type="submit"
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:bg-primary/90 transition-all active:scale-[0.99] cursor-pointer mt-4"
        >
          <span>{isSaving ? "Saving Changes..." : "Save Changes"}</span>
        </button>
      </Form>
    </div>
  );
}
