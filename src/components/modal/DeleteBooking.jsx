"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const DeleteBooking = ({ _id, bookingRoom }) => {
  const bookingId = bookingRoom?.id;

  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBooking = async () => {
    const { data: tokenData } = await authClient.token();

    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${_id}`,
        {
          method: "DELETE",
          cache: "no-store",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete booking");
      }

      toast.success("Booking deleted successfully");
      router.push("/my-bookings");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to delete booking");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-400/10 hover:text-red-600 text-xs font-semibold transition-colors cursor-pointer">
        <FaTrashAlt size={12} />
        <span>Delete</span>
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md bg-card text-card-foreground border border-border rounded-2xl shadow-2xl p-4 sm:p-6">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete this booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete <strong>{bookingId}</strong>?
                All associated bookings will be cleared. This action cannot be
                undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteBooking}
                isDisabled={isDeleting}
                slot="close"
                variant="danger"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteBooking;
