import axiosInstance from "@/config/axiosConfig";
import workerRoutes from "../endpoints/workerEndPoints";

// Create a new worker
export const createWorker = async (workerData: FormData) => {
  try {
    const response = await axiosInstance.post(
      workerRoutes.addWorker,
      workerData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating worker:", error);
    throw error;
  }
};

// Get all workers
export const getWorkers = async () => {
  try {
    const response = await axiosInstance.get(workerRoutes.getWorkers);
    return response.data;
  } catch (error) {
    console.error("Error getting workers:", error);
    throw error;
  }
};
