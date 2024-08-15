import React, { useState } from "react";
import { IVisitor } from "../../../types/visitor";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface VisitorModalProps {
  visitor: IVisitor;
  onClose: () => void;
  onUpdate: (updatedVisitor: IVisitor) => void;
}

export const VisitorModal: React.FC<VisitorModalProps> = ({
  visitor,
  onClose,
  onUpdate,
}) => {
  const [updatedVisitor, setUpdatedVisitor] = useState<IVisitor>(visitor);

  const handleUpdate = (field: keyof IVisitor, value: any) => {
    setUpdatedVisitor((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    Swal.fire({
      title: "Save Changes?",
      text: "Are you sure you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl shadow-2xl",
        title: "text-2xl font-bold",
        htmlContainer: "",
        confirmButton: "py-2 px-4 rounded",
        cancelButton: "py-2 px-4 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate(updatedVisitor);
        onClose();
        Swal.fire({
          title: "Saved!",
          text: "Your changes have been saved.",
          icon: "success",
          customClass: {
            popup: "rounded-xl shadow-2xl",
            title: "text-2xl font-bold",
            htmlContainer: "",
            confirmButton: "py-2 px-4 rounded",
          },
        });
      }
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>{updatedVisitor.name}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              {updatedVisitor.image &&
                typeof updatedVisitor.image === "string" && (
                  <img
                    src={updatedVisitor.image}
                    alt={`${updatedVisitor.name}'s profile`}
                    className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
              <div className="mt-3 space-y-2 text-sm">
                <div>
                  <label>Email</label>
                  <p>{updatedVisitor.email}</p>
                </div>
                <div>
                  <label>Mobile Number</label>
                  <p>{updatedVisitor.mobileNumber}</p>
                </div>
                <div>
                  <label>Apartment No</label>
                  <p>{updatedVisitor.apartmentNumber}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label>Has Vehicle</label>
                  <p>{updatedVisitor.hasVehicle ? "Yes" : "No"}</p>
                </div>
                {updatedVisitor.hasVehicle && (
                  <div>
                    <label>Vehicle Number</label>
                    <p>{updatedVisitor.vehicleNumber}</p>
                  </div>
                )}
              </div>
              <div>
                <label>Check-in Date</label>
                <p>
                  {new Date(updatedVisitor.checkinDate).toLocaleDateString(
                    "en-GB",
                    { day: "2-digit", month: "short", year: "numeric" }
                  )}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label>Check-in Time</label>
                  <input
                    type="time"
                    value={updatedVisitor.checkinTime}
                    onChange={(e) =>
                      handleUpdate("checkinTime", e.target.value)
                    }
                    style={{
                      backgroundColor: "var(--input)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "0.5rem",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label>Check-out Time</label>
                  <input
                    type="time"
                    value={updatedVisitor.checkoutTime}
                    onChange={(e) =>
                      handleUpdate("checkoutTime", e.target.value)
                    }
                    style={{
                      backgroundColor: "var(--input)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "0.5rem",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
              <div>
                <label>Purpose</label>
                <p>{updatedVisitor.purpose}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label>Status</label>
                  <Select
                    value={updatedVisitor.isApproved ? "approved" : "pending"}
                    onValueChange={(value) =>
                      handleUpdate("isApproved", value === "approved")
                    }
                  >
                    <SelectTrigger>
                      <span>
                        {updatedVisitor.isApproved ? "Approved" : "Pending"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label>Restricted</label>
                  <Select
                    value={updatedVisitor.isBlocked ? "blocked" : "not-blocked"}
                    onValueChange={(value) =>
                      handleUpdate("isBlocked", value === "blocked")
                    }
                  >
                    <SelectTrigger>
                      <span>
                        {updatedVisitor.isBlocked ? "Blocked" : "Not Blocked"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-blocked">Not Blocked</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorModal;
