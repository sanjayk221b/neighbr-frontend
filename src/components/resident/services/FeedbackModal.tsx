import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ConfirmationModal from "@/components/ui/confirmationModal";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  initialFeedback?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialFeedback = "",
}) => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    setFeedback(initialFeedback);
  }, [initialFeedback]);

  const handleSubmit = () => {
    onSubmit(feedback);
  };

  const handleDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    setFeedback("");
    onSubmit("");
    setIsConfirmDeleteOpen(false);
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const buttonText = initialFeedback ? "Update Feedback" : "Submit Feedback";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please provide your feedback..."
                className="mt-1"
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={handleSubmit}>{buttonText}</Button>
              {initialFeedback && (
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Feedback
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this feedback?"
      />
    </>
  );
};

export default FeedbackModal;
