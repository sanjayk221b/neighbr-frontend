import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search } from "lucide-react";
import { getWorkers, updateWorkerAvailability } from "@/services/api/worker";
import { IWorker } from "@/types";
import WorkerDetailsModal from "./WorkerDetailsModal";  

const CaretakerWorkers: React.FC = () => {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<IWorker | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await getWorkers();
      setWorkers(res.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch workers.",
        variant: "destructive",
      });
    }
  };

  const handleViewClick = (worker: IWorker) => {
    setSelectedWorker(worker);
  };

  const handleCloseModal = () => {
    setSelectedWorker(null);
  };

  const handleStatusChange = async (newStatus: boolean) => {
    if (selectedWorker) {
      try {
        await updateWorkerAvailability(selectedWorker._id, newStatus);
        fetchWorkers();
        setSelectedWorker({ ...selectedWorker, isAvailable: newStatus });
        toast({
          title: "Success",
          description: `Worker status updated to ${
            newStatus ? "Blocked" : "Unblocked"
          }.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update worker status.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workers</h1>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search workers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {filteredWorkers.map((worker) => (
              <tr key={worker._id} className="hover:bg-muted/50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <img
                    src={worker.imageUrl}
                    alt={`${worker.name} image`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{worker.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{worker.email}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {worker.mobileNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {worker.serviceType}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      worker.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {worker.isAvailable ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleViewClick(worker)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedWorker} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Worker Details
            </DialogTitle>
          </DialogHeader>
          {selectedWorker && (
            <WorkerDetailsModal
              selectedWorker={selectedWorker}
              handleStatusChange={handleStatusChange}
              handleCloseModal={handleCloseModal}
            />
          )}
          <DialogFooter className="mt-6">
            <Button onClick={handleCloseModal} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaretakerWorkers;
