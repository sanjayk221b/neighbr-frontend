import axiosInstance from "@/config/axiosConfig";
import residentRoutes from "../endpoints/residentEndPoints";

export const residentLogin = async (email: string, password: string) => {
  const response = await axiosInstance.post(residentRoutes.residentLogin, {
    email,
    password,
  });
  return response.data;
};

export const residentLogout = async () => {
  const response = await axiosInstance.post(residentRoutes.residentLogout);
  return response.data;
};

export const addVisitor = async (visitorData: FormData) => {
  const response = await axiosInstance.post(
    residentRoutes.addVisitor,
    visitorData
  );
  return response.data;
};

export const getVisitors = async (
  page: number = 1,
  limit: number = 10,
  search = ""
) => {
  const response = await axiosInstance.get(
    residentRoutes.getVisitors(page, limit, search)
  );
  return response.data;
};

export const addServiceRequest = async (serviceData: FormData) => {
  const response = await axiosInstance.post(
    residentRoutes.addServiceRequest,
    serviceData
  );
  return response.data;
};

export const getServiceRequests = async (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ""
) => {
  const response = await axiosInstance.get(
    residentRoutes.getServiceRequests(page, limit, searchTerm)
  );
  return response.data;
};

export const addComplaint = async (complaintData: FormData) => {
  const response = await axiosInstance.post(
    residentRoutes.addComplaint,
    complaintData
  );
  return response.data;
};

export const getComplaints = async (
  page: number,
  limit: number,
  search: string
) => {
  const response = await axiosInstance.get(residentRoutes.getComplaints, {
    params: { page, limit, search },
  });
  return response.data;
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  const response = await axiosInstance.put(residentRoutes.changePassword, {
    email,
    currentPassword,
    newPassword,
  });
  return response.data;
};