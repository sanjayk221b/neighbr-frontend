import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import residentRoutes from "../endpoints/residentEndPoints";

const residentApi = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
});

export const residentLogin = async (email: string, password: string) => {
  try {
    const response = await residentApi.post(residentRoutes.residentLogin, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const residentLogout = async () => {
  try {
    const response = await residentApi.post(residentRoutes.residentLogout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addVisitor = async (visitorData: FormData) => {
  try {
    const response = await residentApi.post(
      residentRoutes.addVisitor,
      visitorData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVisitors = async () => {
  try {
    const response = await residentApi.get(residentRoutes.getVisitors);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addServiceRequest = async (serviceData: FormData) => {
  try {
    const response = await residentApi.post(
      residentRoutes.addServiceRequest,
      serviceData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServiceRequests = async () => {
  try {
    const response = await residentApi.get(residentRoutes.getServiceRequests);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComplaint = async (complaintData: FormData) => {
  try {
    const response = await residentApi.post(
      residentRoutes.addComplaint,
      complaintData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComplaints = async () => {
  try {
    const response = await residentApi.get(residentRoutes.getComplaints);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await residentApi.put(residentRoutes.changePassword, {
      email,
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
