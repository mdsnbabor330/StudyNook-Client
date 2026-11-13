"use client";

import { AlertDialog, Button } from "@heroui/react";
import { MdOutlineCancel } from "react-icons/md";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const CancelBooking = ({ bookingRoom, onCancel }) => {
  const { _id, roomName, date, startTime, endTime } = bookingRoom;
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {

         const { data: tokenData } = await authClient.token();


    try {
      setIsCancelling(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${_id}`, {
        method: "PATCH",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      toast.success("Booking cancelled successfully");
      if (onCancel) {
        onCancel(_id);
      } else {
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.message || "Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <AlertDialog>
      <Button className="flex items-center gap-1.5 text-destructive bg-destructive/10 hover:bg-destructive hover:text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
        <MdOutlineCancel size={18} />
        <span>Cancel</span>
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md bg-card text-card-foreground border border-border rounded-2xl shadow-2xl p-4 sm:p-6">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Are you sure you want to cancel your reservation for <strong>{roomName}</strong>
                {startTime && endTime ? ` (${startTime} - ${endTime})` : ""}? Your time slot will be reopened for other students.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Keep Booking
              </Button>
              <Button
                onClick={handleCancel}
                isDisabled={isCancelling}
                slot="close"
                variant="danger"
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancellation"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CancelBooking;
