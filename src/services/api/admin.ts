import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import adminRoutes from "../endpoints/adminEndPoints";

const adminApi = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
});

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
    const response = await adminApi.post(adminRoutes.adminLogin, {
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
    const response = await adminApi.post(adminRoutes.adminLogout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addResident = async (residentData: ResidentData) => {
  try {
    const response = await adminApi.post(
      adminRoutes.addResident,
      residentData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUnblockResident = async (residentId: string) => {
  try {
    const response = await adminApi.put(
      adminRoutes.blockUnblockResident.replace(":id", residentId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getResidents = async () => {
  try {
    const response = await adminApi.get(adminRoutes.getResidents);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCaretaker = async (caretakerData: CaretakerData) => {
  try {
    const response = await adminApi.post(
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
    const response = await adminApi.get(adminRoutes.getCaretakers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUnblockCaretaker = async (caretakerId: string) => {
  try {
    const response = await adminApi.put(
      adminRoutes.blockUnblockCaretaker.replace(":id", caretakerId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllComplaints = async () => {
  try {
    const response = await adminApi.get(adminRoutes.getAllComplaints);
    return response.data;
  } catch (error) {
    throw error;
  }
};
