import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mail, Phone, Briefcase } from "lucide-react";
import { IWorker } from "@/types";
import ConfirmationModal from "@/components/ui/confirmationModal";

interface WorkerDetailsModalProps {
  selectedWorker: IWorker | null;
  handleStatusChange: (isAvailable: boolean) => void;
  handleCloseModal: () => void;
}

const WorkerDetailsModal: React.FC<WorkerDetailsModalProps> = ({
  selectedWorker,
  handleStatusChange,
  handleCloseModal,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<boolean>(false);

  const handleOpenConfirmation = (checked: boolean) => {
    setNewStatus(checked);
    setIsConfirmOpen(true);
  };

  const handleConfirmChange = () => {
    handleStatusChange(newStatus);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Worker Details
          </DialogTitle>
        </DialogHeader>
        {selectedWorker && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <img
                src={selectedWorker.imageUrl}
                alt={`${selectedWorker.name}`}
                className="h-32 w-32 rounded-full object-cover border-4 border-blue-500"
              />
              <h2 className="text-2xl font-bold mt-4">{selectedWorker.name}</h2>
              <p className="text-sm text-blue-400">
                {selectedWorker.serviceType}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-xs font-medium text-gray-400">
                    Email
                  </label>
                  <p className="text-sm font-medium">{selectedWorker.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-xs font-medium text-gray-400">
                    Mobile Number
                  </label>
                  <p className="text-sm font-medium">
                    {selectedWorker.mobileNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-xs font-medium text-gray-400">
                    Service Type
                  </label>
                  <p className="text-sm font-medium">
                    {selectedWorker.serviceType}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
              <label className="font-medium">Availability</label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={selectedWorker.isAvailable}
                  onCheckedChange={(checked) => handleOpenConfirmation(checked)}
                />
                <span className="text-sm font-medium">
                  {selectedWorker.isAvailable ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        )}
        <DialogFooter className="mt-6">
          <Button onClick={handleCloseModal} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmChange}
        onCancel={() => setIsConfirmOpen(false)}
        message={`Are you sure you want to ${
          newStatus ? "activate" : "deactivate"
        } this worker?`}
      />
    </>
  );
};

export default WorkerDetailsModal;
