import axiosInstance from "@/config/axiosConfig";
import caretakerRoutes from "../endpoints/caretakerEndPoints";
import { IVisitor, IComplaint, IService } from "../../types";

export const caretakerLogin = async (email: string, password: string) => {
  const response = await axiosInstance.post(caretakerRoutes.caretakerLogin, {
    email,
    password,
  });
  return response.data;
};

export const caretakerLogout = async () => {
  const response = await axiosInstance.post(caretakerRoutes.caretakerLogout);
  return response.data;
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  const response = await axiosInstance.put(caretakerRoutes.changePassword, {
    email,
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const getVisitors = async () => {
  const response = await axiosInstance.get(caretakerRoutes.getVisitors);
  return response.data;
};

export const updateVisitor = async (id: string, visitorData: IVisitor) => {
  const response = await axiosInstance.post(
    `${caretakerRoutes.updateVisitor}${id}/update`,
    visitorData
  );
  return response.data;
};

export const getAllComplaints = async () => {
  const response = await axiosInstance.get(caretakerRoutes.getAllComplaints);
  return response.data;
};

export const updateComplaint = async (
  complaintId: string,
  complaintData: IComplaint
) => {
  const response = await axiosInstance.put(caretakerRoutes.updateComplaint, {
    id: complaintId,
    data: complaintData,
  });
  return response.data;
};

export const getAllServiceRequests = async () => {
  const response = await axiosInstance.get(
    caretakerRoutes.getAllServiceRequests
  );
  return response.data;
};

export const updateServiceRequests = async (
  serviceId: string,
  updateData: IService
) => {
  const response = await axiosInstance.put(
    `${caretakerRoutes.updateServiceRequests.replace(":id", serviceId)}`,
    updateData
  );
  return response.data;
};
