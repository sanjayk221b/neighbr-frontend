import axiosInstance from "@/config/axiosConfig";
import workerRoutes from "../endpoints/workerEndPoints";

export const createWorker = async (workerData: FormData) => {
  const response = await axiosInstance.post(workerRoutes.addWorker, workerData);
  return response.data;
};

export const getWorkers = async () => {
  const response = await axiosInstance.get(workerRoutes.getWorkers);
  return response.data;
};

export const blockOrUnblockWorker = async (id: string, isBlocked: boolean) => {
  const url = workerRoutes.blockWorker.replace(":id", id);
  const response = await axiosInstance.patch(url, { isBlocked });
  return response.data;
};

export const updateWorkerAvailability = async (
  id: string,
  isAvailable: boolean
) => {
  const url = workerRoutes.updateAvailability.replace(":id", id);
  const response = await axiosInstance.patch(url, { isAvailable });
  return response.data;
};
