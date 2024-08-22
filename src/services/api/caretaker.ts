import axiosInstance from "@/config/axiosConfig";
import caretakerRoutes from "../endpoints/caretakerEndPoints";
import { IVisitor, IComplaint, IService } from "../../types";

export const caretakerLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(caretakerRoutes.caretakerLogin, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const caretakerLogout = async () => {
  try {
    const response = await axiosInstance.post(caretakerRoutes.caretakerLogout);
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
    const response = await axiosInstance.put(caretakerRoutes.changePassword, {
      email,
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVisitors = async () => {
  try {
    const response = await axiosInstance.get(caretakerRoutes.getVisitors);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVisitor = async (id: string, visitorData: IVisitor) => {
  try {
    const response = await axiosInstance.post(
      `${caretakerRoutes.updateVisitor}${id}/update`,
      visitorData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllComplaints = async () => {
  try {
    const response = await axiosInstance.get(caretakerRoutes.getAllComplaints);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateComplaint = async (
  complaintId: string,
  complaintData: IComplaint
) => {
  try {
    const response = await axiosInstance.put(caretakerRoutes.updateComplaint, {
      id: complaintId,
      data: complaintData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllServiceRequests = async () => {
  try {
    const response = await axiosInstance.get(
      caretakerRoutes.getAllServiceRequests
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateServiceRequests = async (
  serviceId: string,
  updateData: IService
) => {
  try {
    const response = await axiosInstance.put(
      `${caretakerRoutes.updateServiceRequests.replace(":id", serviceId)}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
