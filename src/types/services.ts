export interface IService {
  _id: string;
  serviceType: string;
  residentId: string;
  apartmentNumber: string;
  date: Date;
  time: string;
  mobileNumber: string;
  description?: string;
  workerName?: string;
  solvedDate?: Date;
  imageUrl?: string;
  status: "pending" | "in-progress" | "completed";
  feedback?: string;
}

export interface INewServiceRequest {
  serviceType: string;
  residentId: string;
  apartmentNumber: string;
  date: Date;
  time: string;
  mobileNumber: string;
  description?: string;
  workerName?: string;
  imageUrl?: string;
  status?: "pending"; 
}
