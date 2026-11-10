
"use client";

import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DeleteRoom = ({ _id, room }) => {

    const roomName = room?.roomName;

    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteRoom = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`,
        {
          method: "DELETE",
          next: { revalidate: 60 },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete room");
      }

      toast.success("Room deleted successfully");
      router.push("/rooms");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to delete room");
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
                      <AlertDialog.Dialog className="sm:max-w-md">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                          <AlertDialog.Icon status="danger" />
                          <AlertDialog.Heading>
                            Delete this listing?
                          </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                          <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete{" "}
                            <strong>{roomName}</strong>? All associated bookings
                            will be cleared. This action cannot be undone.
                          </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                          <Button slot="close" variant="tertiary">
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteRoom}
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

export default DeleteRoom;