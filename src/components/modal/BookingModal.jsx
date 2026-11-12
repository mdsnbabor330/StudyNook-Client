"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Label,
  ListBox,
  Modal,
  TextField,
  Select,
  TextArea,
} from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaClock } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { useRouter } from "next/navigation";

// Hourly slots: 08:00 to 20:00
const START_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const ALL_END_HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const BookingModal = ({ room }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [value, setValue] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { hourlyRate, roomName, image, description } = room || {};

  const startHour = Number(startTime.split(":")[0]);
  const endHour = Number(endTime.split(":")[0]);

  const duration = endHour - startHour;
  const isValidTime = duration > 0;

  const totalCost = isValidTime ? duration * Number(hourlyRate || 0) : 0;

  const availableEndHours = ALL_END_HOURS.filter(
    (time) => Number(time.split(":")[0]) > startHour,
  );

  const handleStartTimeChange = (key) => {
    if (key != null) {
      const newStart = String(key);
      setStartTime(newStart);
      const newStartHour = Number(newStart.split(":")[0]);
      if (endHour <= newStartHour) {
        setEndTime(`${String(newStartHour + 1).padStart(2, "0")}:00`);
      }
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const { data: tokenData } = await authClient.token();


    if (!user) {
      toast.error("Please log in to complete your booking.");
      return;
    }

    if (!value) {
      toast.error("Please select a booking date.");
      return;
    }

    const dateStr = value.toString ? value.toString() : String(value);

    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("Booking date must be today or a future date.");
      return;
    }

    if (!isValidTime) {
      toast.error("End time must be later than start time.");
      return;
    }

    if (!room?._id) {
      toast.error("Room information is missing.");
      return;
    }

    const message = formData.get("message")?.toString().trim() || "";

    const bookingData = {
      userId: user.id,
      userName: user.name,
      roomId: room._id,
      roomName,
      image,
      description,
      date: dateStr,
      startTime,
      endTime,
      message,
      totalCost,
      status: "Confirmed",
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create booking.");
      }

      toast.success("Room booked successfully!");
      router.push("/my-bookings");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-6 px-6 text-sm sm:text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-[0.99] cursor-pointer">
        <IoBookmarks />
        <span>Book Now</span>
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md max-h-[92vh] overflow-y-auto bg-card text-card-foreground border border-border shadow-2xl rounded-2xl p-4 sm:p-6">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                Book This Study Room
              </Modal.Heading>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {roomName}
              </p>
            </Modal.Header>

            <hr className="my-4 border-border" />

            <Modal.Body>
              <form
                id="booking-form"
                onSubmit={handleBooking}
                className="flex flex-col gap-4"
              >
                <DatePicker
                  name="date"
                  value={value}
                  onChange={setValue}
                  isRequired
                >
                  <Label className="text-xs sm:text-sm font-medium text-foreground mb-1 block">
                    Select Date
                  </Label>

                  <DateField.Group
                    fullWidth
                    className="border border-border bg-background text-foreground rounded-xl p-2.5 text-sm flex items-center"
                  >
                    <DateField.Input className="flex-1">
                      {(segment) => (
                        <DateField.Segment
                          segment={segment}
                          className="text-foreground data-[placeholder]:text-muted-foreground outline-none"
                        />
                      )}
                    </DateField.Input>

                    <DateField.Suffix>
                      <DatePicker.Trigger className="text-muted-foreground hover:text-foreground p-1">
                        <DatePicker.TriggerIndicator className="text-foreground" />
                      </DatePicker.Trigger>
                    </DateField.Suffix>
                  </DateField.Group>

                  <DatePicker.Popover className="bg-card border border-border rounded-xl shadow-xl p-2 z-50">
                    <Calendar aria-label="Booking date">
                      <Calendar.Header>
                        <Calendar.YearPickerTrigger>
                          <Calendar.YearPickerTriggerHeading />
                          <Calendar.YearPickerTriggerIndicator />
                        </Calendar.YearPickerTrigger>

                        <Calendar.NavButton slot="previous" />
                        <Calendar.NavButton slot="next" />
                      </Calendar.Header>

                      <Calendar.Grid>
                        <Calendar.GridHeader>
                          {(day) => (
                            <Calendar.HeaderCell key={day}>
                              {day}
                            </Calendar.HeaderCell>
                          )}
                        </Calendar.GridHeader>

                        <Calendar.GridBody>
                          {(date) => <Calendar.Cell date={date} />}
                        </Calendar.GridBody>
                      </Calendar.Grid>

                      <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                          {({ year }) => (
                            <Calendar.YearPickerCell year={year} />
                          )}
                        </Calendar.YearPickerGridBody>
                      </Calendar.YearPickerGrid>
                    </Calendar>
                  </DatePicker.Popover>
                </DatePicker>

                <div className="grid grid-cols-2 gap-4">
                  <div className="min-w-0 ">
                    <Label className="mb-1.5 flex items-center gap-1 text-xs sm:text-sm font-medium text-foreground">
                      <FaClock className="text-primary text-xs" />
                      Start Time
                    </Label>

                    <Select
                      aria-label="Start Time"
                      selectedKey={startTime}
                      onSelectionChange={handleStartTimeChange}
                      className="w-full outline-none"
                    >
                      <Select.Trigger className="w-full rounded-xl border border-border bg-background p-2.5 text-xs sm:text-sm flex items-center justify-between">
                        <Select.Value />
                        <Select.Indicator className="text-muted-foreground" />
                      </Select.Trigger>

                      <Select.Popover className="bg-card border border-border rounded-xl shadow-lg p-1 z-50">
                        <ListBox>
                          {START_HOURS.map((time) => (
                            <ListBox.Item
                              key={time}
                              id={time}
                              textValue={time}
                              className="p-2 rounded-lg hover:bg-secondary cursor-pointer text-xs sm:text-sm"
                            >
                              {time}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="min-w-0 ">
                    <Label className="mb-1.5 flex items-center gap-1 text-xs sm:text-sm font-medium text-foreground">
                      <FaClock className="text-primary text-xs" />
                      End Time
                    </Label>

                    <Select
                      aria-label="End Time"
                      selectedKey={endTime}
                      onSelectionChange={(key) => {
                        if (key != null) {
                          setEndTime(String(key));
                        }
                      }}
                      className="w-full outline-none"
                    >
                      <Select.Trigger className="w-full rounded-xl border border-border bg-background p-2.5 text-xs sm:text-sm flex items-center justify-between">
                        <Select.Value />
                        <Select.Indicator className="text-muted-foreground" />
                      </Select.Trigger>

                      <Select.Popover className="bg-card border border-border rounded-xl shadow-lg p-1 z-50">
                        <ListBox>
                          {availableEndHours.map((time) => (
                            <ListBox.Item
                              key={time}
                              id={time}
                              textValue={time}
                              className="p-2 rounded-lg hover:bg-secondary cursor-pointer text-xs sm:text-sm"
                            >
                              {time}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>

                {/* Real-time Computed Price */}
                <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary px-4 py-3 border border-border/60">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {isValidTime ? duration : 0}{" "}
                    {duration === 1 ? "hour" : "hours"} × ${hourlyRate || 0}/hr
                  </p>

                  <p className="shrink-0 text-base sm:text-lg font-bold text-primary">
                    ${totalCost.toFixed(2)}
                  </p>
                </div>

                {/* Special Note */}
                <TextField className="w-full">
                  <Label className="mb-1.5 text-xs sm:text-sm font-medium text-foreground block">
                    Special Note{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </Label>

                  <TextArea
                    name="message"
                    placeholder="Any specific requests, whiteboard markers, or setup needs..."
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-17.5"
                  />
                </TextField>
              </form>
            </Modal.Body>

            <Modal.Footer className="mt-2">
              <Button
                slot="close"
                type="submit"
                form="booking-form"
                isDisabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
              >
                {isSubmitting
                  ? "Verifying & Booking..."
                  : `Confirm Booking • $${totalCost.toFixed(2)}`}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingModal;
