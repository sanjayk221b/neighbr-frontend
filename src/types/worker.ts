export interface IWorker {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  isAvailable: boolean;
  isBlocked: boolean;
  mobileNumber: string;
  serviceType: string;
}
