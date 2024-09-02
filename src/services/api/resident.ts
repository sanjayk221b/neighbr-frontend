import axiosInstance from "@/config/axiosConfig";
import residentRoutes from "../endpoints/residentEndPoints";

export const residentLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(residentRoutes.residentLogin, {
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
    const response = await axiosInstance.post(residentRoutes.residentLogout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addVisitor = async (visitorData: FormData) => {
  try {
    const response = await axiosInstance.post(
      residentRoutes.addVisitor,
      visitorData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVisitors = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axiosInstance.get(
      residentRoutes.getVisitors(page, limit)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addServiceRequest = async (serviceData: FormData) => {
  try {
    const response = await axiosInstance.post(
      residentRoutes.addServiceRequest,
      serviceData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServiceRequests = async (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ""
) => {
  try {
    const response = await axiosInstance.get(
      residentRoutes.getServiceRequests(page, limit, searchTerm)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComplaint = async (complaintData: FormData) => {
  try {
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.get(residentRoutes.getComplaints);
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
    const response = await axiosInstance.put(residentRoutes.changePassword, {
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
