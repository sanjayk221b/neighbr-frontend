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
  try {
    const response = await axiosInstance.post(adminRoutes.adminLogin, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const response = await axiosInstance.post(adminRoutes.adminLogout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addResident = async (residentData: ResidentData) => {
  try {
    const response = await axiosInstance.post(
      adminRoutes.addResident,
      residentData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUnblockResident = async (residentId: string) => {
  try {
    const response = await axiosInstance.put(
      adminRoutes.blockUnblockResident.replace(":id", residentId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getResidents = async () => {
  try {
    const response = await axiosInstance.get(adminRoutes.getResidents);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCaretaker = async (caretakerData: CaretakerData) => {
  try {
    const response = await axiosInstance.post(
      adminRoutes.addCaretaker,
      caretakerData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCaretakers = async () => {
  try {
    const response = await axiosInstance.get(adminRoutes.getCaretakers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUnblockCaretaker = async (caretakerId: string) => {
  try {
    const response = await axiosInstance.put(
      adminRoutes.blockUnblockCaretaker.replace(":id", caretakerId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllComplaints = async () => {
  try {
    const response = await axiosInstance.get(adminRoutes.getAllComplaints);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAnnouncement = async (
  announcementData: Omit<IAnnouncement, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    const response = await axiosInstance.post(
      adminRoutes.createAnnouncement,
      announcementData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get(adminRoutes.getAnnouncements);
    return response.data;
  } catch (error) {
    throw error;
  }
};
