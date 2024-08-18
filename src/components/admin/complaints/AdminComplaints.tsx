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
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";

import { updateComplaint } from "@/services/api/caretaker";
import { getAllComplaints } from "@/services/api/admin";
import { PopulatedComplaint } from "@/types";

const AdminComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState<PopulatedComplaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<PopulatedComplaint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast({
        title: "Error",
        description: "Failed to fetch complaints. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewClick = (complaint: PopulatedComplaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  const handleStatusChange = () => {
    if (selectedComplaint) {
      setSelectedComplaint({
        ...selectedComplaint,
        isResolved: !selectedComplaint.isResolved,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (selectedComplaint) {
      try {
        await updateComplaint(selectedComplaint._id, selectedComplaint);
        fetchComplaints();
        setSelectedComplaint(null);
        toast({
          title: "Success",
          description: "Complaint updated successfully.",
        });
      } catch (error) {
        console.error("Error updating complaint:", error);
        toast({
          title: "Error",
          description: "Failed to update complaint. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Complaints</h1>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
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
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
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
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id} className="hover:bg-muted/50">
                <td className="px-4 py-4 whitespace-nowrap">
                  {complaint.title}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {complaint.description.substring(0, 50)}...
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      !complaint.isResolved
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {!complaint.isResolved ? "Resolved" : "Unresolved"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewClick(complaint)}
                      >
                        Manage
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedComplaint} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Title</label>
                    <p className="mt-1">{selectedComplaint.title}</p>
                  </div>
                  <div>
                    <label className="font-medium">Filed At</label>
                    <p className="mt-1">
                      {new Date(selectedComplaint.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="font-medium">Description</label>
                  <p className="mt-1">{selectedComplaint.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Resident Name</label>
                    <p className="mt-1">{selectedComplaint.residentId.name}</p>
                  </div>
                  <div>
                    <label className="font-medium">Mobile Number</label>
                    <p className="mt-1">
                      {selectedComplaint.residentId.mobileNumber}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="font-medium">Apartment Number</label>
                  <p className="mt-1">
                    {selectedComplaint.residentId.apartmentNumber}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={selectedComplaint.isResolved}
                    onCheckedChange={handleStatusChange}
                  />
                  <label>Resolved</label>
                </div>
                <div>
                  <label className="font-medium">Image</label>
                  <img
                    src={selectedComplaint.image}
                    alt="Complaint"
                    className="mt-2 w-full h-auto max-h-48 object-cover rounded-md"
                  />
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminComplaints;
