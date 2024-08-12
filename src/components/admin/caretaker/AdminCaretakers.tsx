import React, { useState, useEffect, useRef } from "react";
import AddCaretakerModal from "./AddCaretakerModal";
import {
  addCaretaker,
  getCaretakers,
  blockUnblockCaretaker,
} from "../../../services/api/admin";
import { Button } from "../../ui/button";
import Swal from "sweetalert2";

const AdminCaretakers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [caretakers, setCaretakers] = useState<any[]>([]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const data = await getCaretakers();
        setCaretakers(data);
      } catch (error) {
        console.error("Failed to fetch caretakers:", error);
      }
    };

    fetchCaretakers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAddCaretaker = async (userData: any) => {
    try {
      await addCaretaker(userData);
      const data = await getCaretakers();
      setCaretakers(data);
    } catch (error) {
      console.error("Failed to add caretaker:", error);
    }
  };

  const handleBlockCaretaker = async (
    caretakerId: string,
    isCurrentlyBlocked: boolean
  ) => {
    const action = isCurrentlyBlocked ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this caretaker?`,
      text: `This caretaker will be ${action}ed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        await blockUnblockCaretaker(caretakerId);
        setCaretakers(
          caretakers.map((caretaker) =>
            caretaker._id === caretakerId
              ? { ...caretaker, isBlocked: !isCurrentlyBlocked }
              : caretaker
          )
        );

        Swal.fire("Success!", `The caretaker has been ${action}ed.`, "success");
      } catch (error) {
        console.error(`Failed to ${action} caretaker:`, error);
        Swal.fire(
          "Error!",
          `Failed to ${action} the caretaker. Please try again.`,
          "error"
        );
      }
    }
  };

  const handleToggleMenu = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = dropdownRef.current?.offsetHeight || 0;

      let top = rect.bottom + window.scrollY;
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        top = rect.top + window.scrollY - dropdownHeight;
      }

      setMenuPosition({ top, left: rect.left + window.scrollX });
      setActiveMenu(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Caretakers</h1>
        <Button className="font-medium" onClick={() => setIsModalOpen(true)}>
          Add Caretaker
        </Button>
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
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {caretakers.map((caretaker) => (
              <tr key={caretaker._id} className="hover:bg-muted/50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <img
                    src={caretaker.imageUrl}
                    alt={`${caretaker.name}'s profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {caretaker.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {caretaker.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {caretaker.mobileNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      !caretaker.isBlocked
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {!caretaker.isBlocked ? "Active" : "Blocked"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-muted-foreground hover:text-foreground"
                    onClick={(e) => handleToggleMenu(caretaker._id, e)}
                  >
                    &#x22EE;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeMenu && (
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: 1000,
          }}
          className="w-48 bg-card rounded-md shadow-lg py-1 border"
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
            onClick={() => {
              const caretaker = caretakers.find((c) => c._id === activeMenu);
              if (caretaker) {
                handleBlockCaretaker(caretaker._id, caretaker.isBlocked);
              }
              setActiveMenu(null);
            }}
          >
            {caretakers.find((c) => c._id === activeMenu)?.isBlocked
              ? "Unblock"
              : "Block"}
          </button>
        </div>
      )}

      <AddCaretakerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCaretaker}
      />
    </div>
  );
};

export default AdminCaretakers;
