import axiosInstance from "@/config/axiosConfig";
import adminRoutes from "../endpoints/adminEndPoints";
import { IAnnouncement } from "@/types/announcement";

interface ResidentData {
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  password: string;
  hasVehicle: boolean;
  vehicles: string[];
  image: File | null;
}

interface CaretakerData {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  image: File | null;
}

export const adminLogin = async (email: string, password: string) => {
  const response = await axiosInstance.post(adminRoutes.adminLogin, {
    email,
    password,
  });
  return response.data;
};

export const adminLogout = async () => {
  const response = await axiosInstance.post(adminRoutes.adminLogout);
  return response.data;
};

export const addResident = async (residentData: ResidentData) => {
  const response = await axiosInstance.post(
    adminRoutes.addResident,
    residentData
  );
  return response.data;
};

export const blockUnblockResident = async (residentId: string) => {
  const response = await axiosInstance.put(
    adminRoutes.blockUnblockResident.replace(":id", residentId)
  );
  return response.data;
};

export const getResidents = async () => {
  const response = await axiosInstance.get(adminRoutes.getResidents);
  return response.data;
};

export const addCaretaker = async (caretakerData: CaretakerData) => {
  const response = await axiosInstance.post(
    adminRoutes.addCaretaker,
    caretakerData
  );
  return response.data;
};

export const getCaretakers = async () => {
  const response = await axiosInstance.get(adminRoutes.getCaretakers);
  return response.data;
};

export const blockUnblockCaretaker = async (caretakerId: string) => {
  const response = await axiosInstance.put(
    adminRoutes.blockUnblockCaretaker.replace(":id", caretakerId)
  );
  return response.data;
};

export const getAllComplaints = async () => {
  const response = await axiosInstance.get(adminRoutes.getAllComplaints);
  return response.data;
};

export const createAnnouncement = async (
  announcementData: Omit<IAnnouncement, "_id" | "createdAt" | "updatedAt">
) => {
  const response = await axiosInstance.post(
    adminRoutes.createAnnouncement,
    announcementData
  );
  return response.data;
};

export const getAnnouncements = async () => {
  const response = await axiosInstance.get(adminRoutes.getAnnouncements);
  return response.data;
};
