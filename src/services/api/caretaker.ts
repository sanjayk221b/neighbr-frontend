import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import caretakerRoutes from "../endpoints/caretakerEndPoints";
import { IVisitor, IComplaint, IService } from "../../types";

const caretakerApi = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
});

export const caretakerLogin = async (email: string, password: string) => {
  try {
    const response = await caretakerApi.post(caretakerRoutes.caretakerLogin, {
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
    const response = await caretakerApi.post(caretakerRoutes.caretakerLogout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVisitors = async () => {
  try {
    const response = await caretakerApi.get(caretakerRoutes.getVisitors);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVisitor = async (id: string, visitorData: IVisitor) => {
  try {
    const response = await caretakerApi.post(
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
    const response = await caretakerApi.get(caretakerRoutes.getAllComplaints);
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
    const response = await caretakerApi.put(caretakerRoutes.updateComplaint, {
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
    const response = await caretakerApi.get(
      caretakerRoutes.getAllServiceRequests
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateServiceRequests = async (
  serviceId: string ,
  updateData: IService
) => {
  try {
    const response = await caretakerApi.put(
      `${caretakerRoutes.updateServiceRequests.replace(':id', serviceId)}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
