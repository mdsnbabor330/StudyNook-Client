"use client";

import { authClient } from "@/lib/auth-client";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

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

const AddRoom = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { id, name } = user || {};
  const [selectedFloor, setSelectedFloor] = useState("1st Floor");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.title = "StudyNook - Add a Study Room";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { data: tokenData } = await authClient.token();

    const addRoomData = {
      ...Object.fromEntries(formData.entries()),
      floor: selectedFloor || formData.get("floor") || "1st Floor",
      capacity: Number(formData.get("capacity")) || 1,
      hourlyRate: Number(formData.get("hourlyRate")) || 0,
      amenities: formData.getAll("amenities"),
      bookingCount: 0,
      userId: id,
      author: name,
      createdAt: new Date(),
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/my-listings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(addRoomData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add room");
      }

      toast.success("Room added successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Something went wrong adding room");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 pt-24 sm:pt-28">
      <div className="mb-6">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase mb-1">
          NEW LISTING
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
          Add a Study Room
        </h1>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-card border border-border shadow-xl rounded-2xl p-6 sm:p-8"
        render={(props) => <form {...props} />}
      >
        {/* Room Name */}
        <TextField
          isRequired
          name="roomName"
          type="text"
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

        {/* Description */}
        <TextField
          isRequired
          name="description"
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

        {/* Image URL */}
        <TextField
          isRequired
          name="image"
          type="url"
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

        {/* Floor / Capacity / Hourly Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          {/* Floor Input Design */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="floor-select"
              className="text-xs sm:text-sm font-medium text-foreground"
            >
              Floor
            </label>
            <div className="relative">
              <select
                id="floor-select"
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

          {/* Capacity */}
          <TextField
            isRequired
            name="capacity"
            type="number"
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

          {/* Hourly Rate */}
          <TextField
            isRequired
            name="hourlyRate"
            type="number"
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

        {/* Amenities */}
        <div>
          <Label className="text-xs sm:text-sm font-medium text-foreground mb-3 block">
            Amenities
          </Label>
          <CheckboxGroup
            name="amenities"
            className="flex flex-row items-center gap-2.5 flex-wrap"
          >
            {amenitiesList.map((amenity) => (
              <Checkbox
                key={amenity}
                value={amenity}
                className="group cursor-pointer"
              >
                <Checkbox.Content className="rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs sm:text-sm font-medium transition-all group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground group-data-[selected=true]:border-primary">
                  <Checkbox.Control className="hidden">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  {amenity}
                </Checkbox.Content>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:bg-primary/90 transition-all active:scale-[0.99] cursor-pointer mt-4"
        >
          <span>{isSubmitting ? "Publishing..." : "Publish Room Listing"}</span>
        </button>
      </Form>
    </div>
  );
};

export default AddRoom;
