import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getUsers } from "@/services/api/chat";
import { RootState } from "@/redux/store";
import { IParticipant } from "@/types";
import { useSelector } from "react-redux";

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (userId: string) => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  onCreateConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      const filteredUsers = fetchedUsers.filter(
        (user: IParticipant) =>
          user._id !== residentInfo?._id && user.name !== "Admin"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleCreateConversation = (userId: string) => {
    onCreateConversation(userId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Conversation</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="max-h-64 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleCreateConversation(user._id)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewConversationModal;
