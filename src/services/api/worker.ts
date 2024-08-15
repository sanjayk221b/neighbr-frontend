import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import workerRoutes from "../endpoints/workerEndPoints"

const workerApi = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
});

// Create a new worker
export const createWorker = async (workerData: FormData) => {
  try {
    const response = await workerApi.post(workerRoutes.addWorker, workerData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating worker:", error);
    throw error;
  }
};

// Get all workers
export const getWorkers = async () => {
  try {
    const response = await workerApi.get(workerRoutes.getWorkers);
    return response.data;
  } catch (error) {
    console.error("Error getting workers:", error);
    throw error;
  }
};
