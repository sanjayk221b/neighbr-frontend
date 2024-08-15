import React, { useState, useEffect } from "react";
import AddResidentModal from "./AddResidentModal";
import {
  addResident,
  getResidents,
  blockUnblockResident,
} from "../../../services/api/admin";
import { Button } from "../../ui/button";
import Swal from "sweetalert2";
import { ShimmerTable } from "@/components/ui/shimmer/ShimmerTable";

const AdminResidents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [residents, setResidents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      setIsLoading(true);
      try {
        const data = await getResidents();
        setResidents(data);
      } catch (error) {
        console.error("Failed to fetch residents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResidents();
  }, []);

  const handleAddResident = async (userData: any) => {
    try {
      await addResident(userData);
      const data = await getResidents();
      setResidents(data);
    } catch (error) {
      console.error("Failed to add resident:", error);
    }
  };

  const handleBlockResident = async (
    residentId: string,
    isCurrentlyBlocked: boolean
  ) => {
    const action = isCurrentlyBlocked ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this resident?`,
      text: `This resident will be ${action}ed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        await blockUnblockResident(residentId);
        setResidents(
          residents.map((resident) =>
            resident._id === residentId
              ? { ...resident, isBlocked: !isCurrentlyBlocked }
              : resident
          )
        );

        Swal.fire("Success!", `The resident has been ${action}ed.`, "success");
      } catch (error) {
        console.error(`Failed to ${action} resident:`, error);
        Swal.fire(
          "Error!",
          `Failed to ${action} the resident. Please try again.`,
          "error"
        );
      }
    }
  };

  const handleToggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Residents</h1>
        <Button className="font-medium" onClick={() => setIsModalOpen(true)}>
          Add Resident
        </Button>
      </div>

      {isLoading ? (
        <ShimmerTable />
      ) : (
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
                  Apartment No
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
              {residents.map((resident) => (
                <tr key={resident._id} className="hover:bg-muted/50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={resident.image}
                      alt={`${resident.name}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {resident.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {resident.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {resident.mobileNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {resident.apartmentNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        !resident.isBlocked
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {!resident.isBlocked ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="relative">
                      <button
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => handleToggleMenu(resident._id)}
                      >
                        &#x22EE;
                      </button>
                      {activeMenu === resident._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-20 border">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                            onClick={() => {
                              handleBlockResident(
                                resident._id,
                                resident.isBlocked
                              );
                              setActiveMenu(null);
                            }}
                          >
                            {!resident.isBlocked ? "Block" : "Unblock"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddResidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddResident}
      />
    </div>
  );
};

export default AdminResidents;
