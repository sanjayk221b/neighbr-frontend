import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddWorkerModal from "./AddWorkerModal";

const AdminWorkers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workers</h1>
        <Button className="font-medium" onClick={() => setIsModalOpen(true)}>
          Add Worker
        </Button>
      </div>
      <AddWorkerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminWorkers;
